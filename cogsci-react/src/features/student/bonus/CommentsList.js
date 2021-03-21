import React, { createRef, useEffect, useRef, useState } from "react";
import { IS_ADMIN } from "../../../constants";
import Comment from "./Comment";
import MyComment from "./MyComment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";
import { useDispatch } from "react-redux";
import { insertComment, loadComments } from "./bonusSlice";
import createOrderedCommentsMap from "./../../../components/ArrayUtils";

function CommentsList({ comments, currentUserId, bonusId }) {
  const dispatch = useDispatch();
  const [commentsMap, setCommentsMap] = useState(new Map());
  const [scrollElementIndex, setScrollElementIndex] = useState(null);
  const myRef = useRef([0, 1].map(() => createRef()));

  const [myCommentClass, setMyCommentClass] = useState(-1);

  useEffect(() => {
    if (comments) {
      setCommentsMap(createOrderedCommentsMap(comments));
    }
  }, [comments]);

  const scrollWidthOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = 96;
    window.scrollTo({ top: yCoordinate - yOffset, behavior: "smooth" });
  };

  const handleOdpovedat = (event) => {
    setMyCommentClass(event.target.getAttribute("parentId"));
    setScrollElementIndex(event.target.getAttribute("index"));
  };

  useEffect(() => {
    if (scrollElementIndex) {
      scrollWidthOffset(myRef.current[scrollElementIndex].current);
      setScrollElementIndex(null);
    }
  }, [scrollElementIndex]);

  const handleAddComment = (event) => {
    const refCommentId = event.target.getAttribute("refcomment");
    const content = event.target.getAttribute("content");
    dispatch(insertComment(currentUserId, bonusId, content, refCommentId)).then(
      () => {
        dispatch(loadComments(bonusId));
        setMyCommentClass(-1);
      }
    );
  };

  const handleCancel = () => {
    setMyCommentClass(-1);
  };

  return (
    <aside className="mt-5">
      <hr />
      <h3 className="mb-3">Komentáre</h3>

      {showLoaderIfAnyNull(comments) || (
        <Container className="m-0 p-0">
          <Row>
            <Col md={7}>
              {[...commentsMap.keys()].map((comment, i) => (
                <div key={comment.id}>
                  <Comment
                    parentId={comment.id}
                    comment={comment}
                    handleOdpovedat={handleOdpovedat}
                    isMyComment={currentUserId == comment.user_id}
                    isAdminComment={comment.user_role == IS_ADMIN}
                    index={i}
                  />

                  {commentsMap.get(comment).map((subcomment) => (
                    <div key={subcomment.id}>
                      <Comment
                        parentId={comment.id}
                        comment={subcomment}
                        indentLeft="ml-5"
                        index={i}
                        handleOdpovedat={handleOdpovedat}
                        isMyComment={currentUserId == subcomment.user_id}
                        isAdminComment={subcomment.user_role == IS_ADMIN}
                      />
                    </div>
                  ))}
                  {/* Skryta bublinka na pridanie komentaru - zviditelni sa, ked stlaci odpovedat */}
                  <MyComment
                    id={comment.id}
                    classname={myCommentClass == comment.id ? "ml-5" : "d-none"}
                    handleCancel={handleCancel}
                    handleAddComment={handleAddComment}
                    header="Odpoveď"
                    rows={3}
                    myRef={myRef}
                    flexIndent="justify-content-between"
                    placeholder="Text vašej odpovede..."
                    buttonText="Pridať odpoveď"
                    index={i}
                    refcomment={
                      comment.announcement_comment_id == null
                        ? comment.id
                        : comment.announcement_comment_id
                    }
                  />
                </div>
              ))}
              <MyComment
                id="new"
                handleCancel={handleCancel}
                header="Nový komentár"
                rows={5}
                zrusitBtnClassname="d-none"
                flexIndent="justify-content-end"
                placeholder="Text vášho komentára..."
                buttonText="Pridať komentár"
                myRef={myRef}
              />
            </Col>
          </Row>
        </Container>
      )}
    </aside>
  );
}

export default CommentsList;
