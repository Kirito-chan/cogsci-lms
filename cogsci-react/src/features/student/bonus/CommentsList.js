import React, { useState } from "react";
import { IS_ADMIN } from "../../../constants";
import Comment from "./Comment";
import MyComment from "./MyComment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { showLoaderIfNull } from "../../../components/StringUtils";
import { useDispatch } from "react-redux";
import { insertComment, loadComments } from "./bonusSlice";
//import createOrderedCommentsMap from "./../../../components/ArrayUtils";

function CommentsList({ comments, currentUserId, bonusId }) {
  //const commentsMap = createOrderedCommentsMap(comments);
  const dispatch = useDispatch();
  const [myCommentClass, setMyCommentClass] = useState(-1);

  const handleOdpovedat = (event) => {
    setMyCommentClass(event.target.id);
  };

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
      {showLoaderIfNull(comments) || (
        <Container className="m-0 p-0">
          <Row>
            <Col md={7}>
              {comments.map((comment, i) => (
                <div key={i}>
                  <Comment
                    comment={comment}
                    handleOdpovedat={handleOdpovedat}
                    isMyComment={currentUserId == comment.user_id}
                    isAdminComment={comment.user_role == IS_ADMIN}
                  />
                  <MyComment
                    id={comment.id}
                    classname={myCommentClass == comment.id ? "ml-5" : "d-none"}
                    handleCancel={handleCancel}
                    handleAddComment={handleAddComment}
                    header="Odpoveď"
                    rows={3}
                    flexIndent="justify-content-between"
                    placeholder="Text vašej odpovede..."
                    buttonText="Pridať odpoveď"
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
              />
            </Col>
          </Row>
        </Container>
      )}
    </aside>
  );
}

export default CommentsList;
