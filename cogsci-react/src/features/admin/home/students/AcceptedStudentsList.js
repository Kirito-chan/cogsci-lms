import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { URL_ADMIN_STUDENT_DETAIL } from "../../../../constants";

function AcceptedStudentsList({ acceptedStudents, subjectId }) {
  return (
    <div className="mb-5">
      <h3>Potvrdení študenti</h3>

      {acceptedStudents.length === 0 && (
        <p className="text-secondary">Žiadni</p>
      )}

      {acceptedStudents.map((student) => (
        <div key={student.id} className="mb-3">
          <Link
            to={
              "/subject/" +
              subjectId +
              URL_ADMIN_STUDENT_DETAIL +
              "/" +
              student.id
            }
            className="pl-0 nav-link"
          >
            {student.last_name} {student.first_name}
          </Link>

          <Button variant="outline-danger" size="sm">
            Zamietnuť
          </Button>

          <Button variant="warning" size="sm" className="ml-5 mr-2">
            Hodnotenie
          </Button>
          <Button variant="success" size="sm">
            Prezentácia
          </Button>
        </div>
      ))}
    </div>
  );
}

export default AcceptedStudentsList;
