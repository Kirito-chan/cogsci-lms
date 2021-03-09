import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SlidersForm from "./SlidersForm";
import Container from "react-bootstrap/Container";

function PresentationEvaluation() {
  return (
    <div className="mt-3">
      <Container>
        <Row>
          <h4>Hodnotenie prezentácie</h4>
        </Row>
        <Row>
          <Col md={10} className="ml-0 pl-0">
            <SlidersForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PresentationEvaluation;
