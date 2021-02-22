import React from "react";
import formatDate from "../../../components/DateUtils";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CommentsList.css";

function CommentsList({ bonusId, comments }) {
  return (
    <aside className="pl-2 mt-5">
      <hr />
      <h3 id={bonusId} className="mb-3">
        Komentáre
      </h3>
      {comments.map((comment, i) => (
        <Container key={i} className="m-0 p-0">
          <Row>
            <Col md={7}>
              <article className="p-3 mb-2 bg-light-grey ml-0">
                <p className="small mb-1">
                  <strong>
                    {comment.first_name} {comment.last_name}
                  </strong>{" "}
                  <p className="d-inline-block small text-muted mb-0">
                    {formatDate(comment.date)}
                  </p>
                </p>
                <p>{comment.content}</p>
                <Button variant="outline-secondary" className="small" size="sm">
                  Odpovedať
                </Button>{" "}
              </article>
            </Col>
          </Row>
        </Container>
      ))}
    </aside>
  );
}

export default CommentsList;
