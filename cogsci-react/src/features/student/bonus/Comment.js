import React from "react";
import formatDate from "../../../components/DateUtils";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CommentsList.css";

function Comment({ comment, handleOdpovedat }) {
  return (
    <Container className="m-0 p-0">
      <Row>
        <Col md={7}>
          <article className="p-3 mb-2 bg-light-grey ml-0">
            <p className="small mb-1">
              <strong>
                {comment.first_name} {comment.last_name}
              </strong>{" "}
              <span className="d-inline-block small text-muted mb-0">
                {formatDate(comment.date)}
              </span>
            </p>
            <p>{comment.content}</p>
            <Button
              variant="outline-secondary"
              size="sm"
              id={comment.id}
              onClick={handleOdpovedat}
            >
              Odpovedať
            </Button>
          </article>
        </Col>
      </Row>
    </Container>
  );
}

export default Comment;
