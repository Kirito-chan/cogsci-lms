import React, { useState } from "react";
import { IS_ADMIN } from "../../../constants";
import Comment from "./Comment";
import MyComment from "./MyComment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CommentsList({ bonusId, comments, currentUserId }) {
  const [myCommentClass, setMyCommentClass] = useState(-1);

  const handleOdpovedat = (event) => {
    setMyCommentClass(event.target.id);
    //dispatch(loadCurrentSubjectId(subjectId));
  };

  const handleZrusit = () => {
    setMyCommentClass(-1);
  };

  return (
    <aside className="mt-5">
      <hr />
      <h3 id={bonusId} className="mb-3">
        Komentáre
      </h3>
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
                  id="regular"
                  classname={myCommentClass == comment.id ? "ml-5" : "d-none"}
                  handleZrusit={handleZrusit}
                  header="Odpoveď"
                  rows={3}
                  flexIndent="justify-content-between"
                  placeholder="Text vašej odpovede..."
                  buttonText="Pridať odpoveď"
                />
              </div>
            ))}

            <MyComment
              id="new"
              handleZrusit={handleZrusit}
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
    </aside>
  );
}

export default CommentsList;
