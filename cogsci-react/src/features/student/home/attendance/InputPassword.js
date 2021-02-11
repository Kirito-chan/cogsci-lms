import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function InputPassword() {
  return (
    <div>
      <Form>
        <Form.Row>
          <Col>
            <label htmlFor="password" className="sr-only">
              Heslo:
            </label>
            <Form.Control id="password" type="password" placeholder="Heslo" />
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

export default InputPassword;
