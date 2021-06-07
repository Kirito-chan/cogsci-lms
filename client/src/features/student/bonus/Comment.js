import React, { useState } from "react";
import formatDate from "../../../components/utils/DateUtils";
import Button from "react-bootstrap/Button";
import "./Bonus.css";
import CommentEval from "./CommentEval";
import ModalDeleteComment from "./ModalDeleteComment";

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
  isTeachers, // if it is from teacher presentation or student presentation (it is needed to know whose comment to delete, whether comment from teacher comments table or student comments table)
  id, // bonus or presentation id
}) {
  const indentLeftCSS = isSubcomment ? "ml-5" : "ml-0";
  const [showOdstranit, setShowOdstranit] = useState(false);
  const showModalOdstranit = () => setShowOdstranit(true);
  return (
    <article
      className={
        "p-3 mb-2 " +
        (isAdminComment ? " bg-dark-grey " : " bg-light-grey ") +
        (isMyComment && !isAdminComment
          ? "border border-primary my-border-2 "
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
        <div className="d-inline">
          {" "}
          {isAdmin && (
            <Button
              variant="outline-danger"
              size="sm"
              className="mr-2"
              onClick={showModalOdstranit}
            >
              Odstrániť
            </Button>
          )}
        </div>

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
      <ModalDeleteComment
        showOdstranit={showOdstranit}
        setShowOdstranit={setShowOdstranit}
        userName={comment.first_name + " " + comment.last_name}
        id={id}
        isBonus={isBonus}
        commentId={comment.id}
        isTeachers={isTeachers}
      />
    </article>
  );
}

export default Comment;
