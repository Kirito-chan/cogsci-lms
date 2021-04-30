import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ForgottenPasswordView({ handleSubmit, setEmail }) {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col lg={3} md={4} sm={5} xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="Zadajte svoj email"
                />
              </Col>
            </Form.Group>

            <Row>
              <Col className="text-center">
                <Button variant="primary" type="submit">
                  Obnoviť heslo
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default ForgottenPasswordView;
