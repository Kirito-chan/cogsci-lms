import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  DIFFERENT_PASSWORD_ERROR,
  MINIMAL_PASSWORD_LENGTH,
  SHORT_PASSWORD_ERROR,
} from "../../constants";

function ResetedPasswordView({
  username,
  userFullName,
  password,
  passwordAgain,
  setPassword,
  setPasswordAgain,
  handleSubmit,
  success,
  passwordUpdateError,
}) {
  return (
    <div>
      <h2 className="text-center mb-5">Nové heslo</h2>
      <Container>
        <Row>
          <Col></Col>
          <Col lg={3} md={4} sm={5} xs={6}>
            <Form onSubmit={handleSubmit}>
              <p>
                <b>Užívateľ: </b>
                {userFullName}
              </p>
              <p>
                <b>Používateľské meno: </b>
                {username}
              </p>

              <Form.Group as={Row} className="mt-5">
                <Col>
                  <Form.Label>Nové heslo</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    autoComplete="new-password"
                    isInvalid={password?.length < MINIMAL_PASSWORD_LENGTH}
                  />
                  <Form.Control.Feedback type="invalid">
                    {SHORT_PASSWORD_ERROR}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col>
                  <Form.Label>Zopakujte nové heslo</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => {
                      setPasswordAgain(e.target.value);
                    }}
                    autoComplete="new-password"
                    isInvalid={password !== passwordAgain}
                  />
                  <Form.Control.Feedback type="invalid">
                    {DIFFERENT_PASSWORD_ERROR}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Row>
                <Col className="text-center">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={
                      password != passwordAgain ||
                      password.length < MINIMAL_PASSWORD_LENGTH
                    }
                  >
                    Zmeniť heslo
                  </Button>
                </Col>
              </Row>
              {success}
              {passwordUpdateError}
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResetedPasswordView;
