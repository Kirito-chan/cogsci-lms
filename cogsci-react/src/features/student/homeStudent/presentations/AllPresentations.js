import React from "react";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AllPresentations() {
  return (
    <div className="mb-3">
      <Row>
        <Col>
          <h2>Prezentácie</h2>
        </Col>
      </Row>
      <Row>
        <Nav.Link href="#allpresentations">Všetky prezentácie</Nav.Link>
      </Row>
    </div>
  );
}

export default AllPresentations;
