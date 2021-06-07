import React, { useState } from "react";
import { IS_ADMIN } from "../../../constants";
import Comment from "./Comment";
import MyComment from "./MyComment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  showLoaderIfAnyNull,
  showLoaderIfEmptyArray,
} from "../../../components/utils/StringUtils";
import { useDispatch, useSelector } from "react-redux";
import { getIsAdmin } from "../../../app/currentUserSlice";
import { loadBonuses } from "../home/homeSlice";
import { useParams } from "react-router";

function CommentsList({
  comments,
  currentUserId,
  id, // bonusId or presentationId
  isTeachers,
  commentsMap,
  refToScrolledElement,
  setScrollElementIndex,
  insertComment,
  loadComments,
  isBonus,
}) {
  const dispatch = useDispatch();
  const isAdmin = useSelector(getIsAdmin);
  const { subjectId } = useParams();
  const [myCommentClass, setMyCommentClass] = useState(-1);

  const handleOdpovedat = (event) => {
    setMyCommentClass(event.target.getAttribute("parentId"));
    setScrollElementIndex(event.target.getAttribute("index"));
  };

  const handleAddComment = (event) => {
    const refCommentId = event.target.getAttribute("refcomment");
    const content = event.target.getAttribute("content");
    dispatch(
      insertComment(currentUserId, id, content, refCommentId, subjectId)
    ).then(() => {
      dispatch(loadBonuses(currentUserId, subjectId));
      dispatch(loadComments(id, subjectId)).then(() => {
        setMyCommentClass(-1);
      });
    });
  };

  const handleCancel = () => {
    setMyCommentClass(-1);
  };

  return (
    <aside className="mt-5">
      <hr />
      <h3 className="mb-3" id="myNewComment">
        Komentáre
      </h3>

      {showLoaderIfAnyNull(comments) ||
        (comments.length > 0 &&
          showLoaderIfEmptyArray(refToScrolledElement)) || (
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
                      isAdmin={isAdmin}
                      id={id}
                      isBonus={isBonus}
                      isTeachers={isTeachers}
                    />

                    {commentsMap.get(comment).map((subcomment) => (
                      <div key={subcomment.id}>
                        <Comment
                          isSubcomment={true}
                          parentId={comment.id}
                          comment={subcomment}
                          index={i}
                          handleOdpovedat={handleOdpovedat}
                          isMyComment={currentUserId == subcomment.user_id}
                          isAdminComment={subcomment.user_role == IS_ADMIN}
                          isAdmin={isAdmin}
                          isBonus={isBonus}
                          id={id}
                          isTeachers={isTeachers}
                        />
                      </div>
                    ))}
                    {/* Skryta bublinka na pridanie komentaru - zviditelni sa, ked stlaci odpovedat */}
                    <MyComment
                      id={comment.id}
                      classname={
                        myCommentClass == comment.id ? "ml-5" : "d-none"
                      }
                      handleCancel={handleCancel}
                      handleAddComment={handleAddComment}
                      header="Odpoveď"
                      rows={3}
                      myRef={refToScrolledElement}
                      flexIndent="justify-content-between"
                      placeholder="Text vašej odpovede..."
                      buttonText="Pridať odpoveď"
                      index={i}
                      refcomment={
                        comment.ref_comment_id == null
                          ? comment.id
                          : comment.ref_comment_id
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
                  handleAddComment={handleAddComment}
                />
              </Col>
            </Row>
          </Container>
        )}
    </aside>
  );
}

export default CommentsList;
