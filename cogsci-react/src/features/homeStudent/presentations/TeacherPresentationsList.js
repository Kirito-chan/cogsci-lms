import React from "react";
import Nav from "react-bootstrap/Nav";
import Discussion from "../Discussion";

function TeacherPresentationsList({ teacherPresentations }) {
  return (
    <div>
      <h3>Učiteľove</h3>

      {teacherPresentations.map((presentation, i) => (
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

export default TeacherPresentationsList;
