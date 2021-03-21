import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Bonus.css";

function MyComment({
  classname,
  handleCancel,
  handleAddComment,
  header,
  rows,
  zrusitBtnClassname,
  flexIndent,
  placeholder,
  buttonText,
  id,
  refcomment,
  myRef,
  index,
}) {
  const [content, setContent] = useState("");

  return (
    <article
      className={"p-3 mb-2 bg-light-grey ml-0 " + classname}
      id={id == "new" ? "myNewComment" : id}
      ref={myRef.current[index]}
    >
      <Form>
        <Form.Group controlId="Form.ControlTextarea">
          <Form.Label>
            <strong>{header}</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={rows}
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <div className={"d-flex " + flexIndent}>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              handleCancel();
              setContent("");
            }}
            className={zrusitBtnClassname}
          >
            Zrušiť
          </Button>
          <Button
            id={id}
            refcomment={refcomment}
            content={content}
            variant="success"
            className="mr-2"
            size="sm"
            onClick={handleAddComment}
          >
            {buttonText}
          </Button>
        </div>
      </Form>
    </article>
  );
}

export default MyComment;
