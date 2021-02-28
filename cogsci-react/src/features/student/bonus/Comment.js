import React from "react";
import formatDate from "../../../components/DateUtils";
import Button from "react-bootstrap/Button";

import "./CommentsList.css";

function Comment({ comment, handleOdpovedat, isMyComment, isAdminComment }) {
  return (
    <article
      className={
        "p-3 mb-2 bg-light-grey ml-0 " +
        (isMyComment
          ? "border border-primary"
          : isAdminComment
          ? "border border-success"
          : "")
      }
    >
      <p className="small mb-1">
        <strong>
          {comment.first_name} {comment.last_name}
        </strong>{" "}
        <span className="d-inline-block small text-muted mb-0">
          {formatDate(comment.date)}
        </span>
      </p>
      <p>{comment.content}</p>
      <div className="d-flex justify-content-end">
        <Button
          variant="outline-primary"
          size="sm"
          id={comment.id}
          onClick={handleOdpovedat}
        >
          Odpovedať
        </Button>
      </div>
    </article>
  );
}

export default Comment;
