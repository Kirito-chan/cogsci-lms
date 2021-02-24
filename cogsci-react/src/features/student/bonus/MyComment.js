import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./CommentsList.css";

function MyComment({
  classname,
  currentUserName,
  handleZrusit,
  placeholder,
  rows,
  zrusitBtnClassname,
}) {
  return (
    <Container className={classname}>
      <Row>
        <Col md={7}>
          <article className="p-3 mb-2 bg-light-grey ml-0">
            <Form>
              <Form.Group controlId="Form.ControlTextarea">
                <Form.Label>
                  <strong>{currentUserName}</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={rows}
                  placeholder={placeholder}
                />
              </Form.Group>
              <Button variant="outline-success" className="mr-2" size="sm">
                Odoslať
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleZrusit}
                className={zrusitBtnClassname}
              >
                Zrušiť
              </Button>
            </Form>
          </article>
        </Col>
      </Row>
    </Container>
  );
}

export default MyComment;
