import React, { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CommentsList.css";
import { useLocation } from "react-router-dom";

function MyComment({
  classname,
  handleZrusit,
  header,
  rows,
  zrusitBtnClassname,
  flexIndent,
  placeholder,
  buttonText,
  id,
}) {
  const location = useLocation();
  const myNewComment = useRef(null);
  const regularComment = useRef(null);

  useEffect(() => {
    if (
      myNewComment &&
      id == "new" &&
      location.hash.includes("#myNewComment")
    ) {
      myNewComment.current.scrollIntoView({
        behaviour: "smooth",
      });
    }
  });

  return (
    <article
      className={"p-3 mb-2 bg-light-grey ml-0 " + classname}
      ref={id == "new" ? myNewComment : regularComment}
    >
      <Form>
        <Form.Group controlId="Form.ControlTextarea">
          <Form.Label>
            <strong>{header}</strong>
          </Form.Label>
          <Form.Control as="textarea" rows={rows} placeholder={placeholder} />
        </Form.Group>
        <div className={"d-flex " + flexIndent}>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleZrusit}
            className={zrusitBtnClassname}
          >
            Zrušiť
          </Button>
          <Button variant="success" className="mr-2" size="sm">
            {buttonText}
          </Button>
        </div>
      </Form>
    </article>
  );
}

export default MyComment;
