import React from "react";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentPresInfo from "./StudentPresInfo";

function StudentPresentationsList({ studentPresentations }) {
  return (
    <div>
      <h3>Študentské prezentácie</h3>
      {studentPresentations.map((presentation, i) => (
        <article key={i}>
          <Row>
            <Nav.Link href={`pres${presentation.id}`}>
              {presentation.title} - {presentation.first_name}{" "}
              {presentation.last_name}
            </Nav.Link>
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
