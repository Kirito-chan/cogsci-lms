import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SlidersForm from "./SlidersForm";
import Container from "react-bootstrap/Container";

function PresentationEvaluation() {
  return (
    <div className="mt-3">
      <h3>
        <strong>Hodnotenie prezentácie</strong>
      </h3>

      <Container>
        <Row>
          <Col md={1}> </Col>
          <Col md={10}>
            <SlidersForm />
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default PresentationEvaluation;
