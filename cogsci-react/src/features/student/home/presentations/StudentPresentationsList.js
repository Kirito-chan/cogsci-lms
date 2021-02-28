import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentPresInfo from "./StudentPresInfo";
import { URL_PRESENTATIONS } from "../../../../constants";
import { Link } from "react-router-dom";

function StudentPresentationsList({ studentPresentations, subjectId }) {
  return (
    <div>
      <h3>Študentské prezentácie</h3>
      {studentPresentations.map((presentation, i) => (
        <article key={i}>
          <Row>
            <Link
              to={
                "/subject/" +
                subjectId +
                URL_PRESENTATIONS +
                "/" +
                presentation?.pres_id
              }
              className="nav-link"
            >
              {presentation.title} - {presentation.first_name}{" "}
              {presentation.last_name}
            </Link>
          </Row>

          <Row>
            <Col>
              <StudentPresInfo presentation={presentation} />
            </Col>
          </Row>
        </article>
      ))}
    </div>
  );
}

export default StudentPresentationsList;
