import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function InputPasswordView({ handleSubmit, password, handlePassword, error }) {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Label htmlFor="password" className="sr-only">
              Heslo
            </Form.Label>
            <Form.Control
              type="text"
              value={password}
              onChange={(e) => {
                handlePassword(e);
              }}
              placeholder="Heslo"
              isInvalid={error ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Potvrdiť účasť
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}

export default InputPasswordView;
