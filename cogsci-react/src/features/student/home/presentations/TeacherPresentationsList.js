import React from "react";
import { Link } from "react-router-dom";
import { URL_PRESENTATIONS } from "../../../../constants";
// import Row from "react-bootstrap/Row";

import Discussion from "../Discussion";

function TeacherPresentationsList({ teacherPresentations, subjectId, h2 }) {
  return (
    <div className="mb-5">
      {h2 ? (
        <h2 className="mt-5">Učiteľské prezentácie</h2>
      ) : (
        <h3>Učiteľské prezentácie</h3>
      )}

      {teacherPresentations.length !== 0 || (
        <p className="text-secondary">Žiadne</p>
      )}

      {teacherPresentations.map((presentation, i) => (
        <div key={presentation.id}>
          <Link
            to={
              "/subject/" +
              subjectId +
              URL_PRESENTATIONS +
              "/" +
              presentation.id +
              "?is_opened=false&teacher=true"
            }
            className="pl-0 nav-link"
          >
            {teacherPresentations.length - i}. {presentation.title}
          </Link>

          <Discussion
            data={presentation}
            classAttribute="d-inline-block mr-3"
            redirectTo={
              "/subject/" +
              subjectId +
              URL_PRESENTATIONS +
              "/" +
              presentation.id
            }
            queryString={"?is_opened=false&teacher=true"}
            hash={"#myNewComment"}
          />
        </div>
      ))}
    </div>
  );
}

export default TeacherPresentationsList;
