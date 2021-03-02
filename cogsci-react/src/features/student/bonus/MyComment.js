import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CommentsList.css";

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
  return (
    <article
      className={"p-3 mb-2 bg-light-grey ml-0 " + classname}
      id={id == "new" ? "myNewComment" : id}
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
