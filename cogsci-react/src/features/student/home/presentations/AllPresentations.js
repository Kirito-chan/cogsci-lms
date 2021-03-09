import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { URL_PRESENTATIONS } from "../../../../constants";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function AllPresentations() {
  const { subjectId } = useParams();
  return (
    <div className="mb-3">
      <Row>
        <Col>
          <h2>Prezentácie</h2>
        </Col>
      </Row>
      <Row>
        <Link
          to={"/subject/" + subjectId + URL_PRESENTATIONS}
          className="nav-link pt-0"
        >
          Všetky prezentácie
        </Link>
      </Row>
    </div>
  );
}

export default AllPresentations;
