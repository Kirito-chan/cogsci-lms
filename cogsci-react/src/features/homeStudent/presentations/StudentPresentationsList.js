import React from "react";
import Nav from "react-bootstrap/Nav";
import Discussion from "../Discussion";

function StudentPresentationsList({ studentPresentations }) {
  return (
    <div>
      <h3>Študentské prezentácie</h3>
      {studentPresentations.map((presentation, i) => (
        <div key={presentation.id}>
          <Nav.Link href={`pres${presentation.id}`}>
            {i + 1}. {presentation.title}
          </Nav.Link>
          <Discussion
            data={presentation}
            classAttribute="d-inline-block mr-3 pl-2"
          />
        </div>
      ))}
    </div>
  );
}

export default StudentPresentationsList;
