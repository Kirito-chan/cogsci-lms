import React from "react";
import formatDate from "../../../components/utils/DateUtils";
import Button from "react-bootstrap/Button";
import "./Bonus.css";
import CommentEval from "./CommentEval";

function Comment({
  comment,
  handleOdpovedat,
  isMyComment,
  isAdminComment,
  parentId,
  index,
  isSubcomment,
  isAdmin,
  isBonus,
  id, // bonus or presentation id
}) {
  const indentLeftCSS = isSubcomment ? "ml-5" : "ml-0";
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
      <div className="d-flex">
        <p className="small mb-1 d-inline mr-auto">
          <strong>
            {comment.first_name} {comment.last_name}
          </strong>{" "}
          <span className="d-inline-block small text-muted mb-0">
            {formatDate(comment.date)}
          </span>
        </p>

        <div className="small mb-1 d-inline">
          {isBonus && isAdmin && !isSubcomment && !isAdminComment && (
            <CommentEval comment={comment} bonusId={id} />
          )}
        </div>
      </div>
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
