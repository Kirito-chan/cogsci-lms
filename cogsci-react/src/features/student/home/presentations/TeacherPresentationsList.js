import React from "react";
import Nav from "react-bootstrap/Nav";
// import Row from "react-bootstrap/Row";

import Discussion from "../Discussion";

function TeacherPresentationsList({ teacherPresentations }) {
  return (
    <div className="mb-5">
      <h3>Učiteľské prezentácie</h3>

      {teacherPresentations.length !== 0 || (
        <p className="text-secondary">Žiadne</p>
      )}

      {teacherPresentations.map((presentation, i) => (
        <div key={presentation.id}>
          <Nav.Link href={`pres${presentation.id}`} className="pl-0">
            {teacherPresentations.length - i}. {presentation.title}
          </Nav.Link>

          <Discussion
            data={presentation}
            classAttribute="d-inline-block mr-3"
          />
        </div>
      ))}
    </div>
  );
}

export default TeacherPresentationsList;
