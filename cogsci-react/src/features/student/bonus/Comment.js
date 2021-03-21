import React from "react";
import formatDate from "../../../components/DateUtils";
import Button from "react-bootstrap/Button";
import "./Bonus.css";

function Comment({
  comment,
  handleOdpovedat,
  isMyComment,
  isAdminComment,
  indentLeft,
  parentId,
  index,
}) {
  const indentLeftCSS = indentLeft ? indentLeft : "ml-0";
  return (
    <article
      className={
        "p-3 mb-2 bg-light-grey " +
        (isMyComment
          ? "border border-primary"
          : isAdminComment
          ? "border border-success"
          : "") +
        " " +
        indentLeftCSS
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
      <div className="with-spaces">
        <p>{comment.content}</p>
      </div>

      <div className="d-flex justify-content-end">
        <Button
          variant="outline-primary"
          size="sm"
          parentid={parentId}
          onClick={handleOdpovedat}
          index={index}
        >
          Odpovedať
        </Button>
      </div>
    </article>
  );
}

export default Comment;
