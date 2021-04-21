import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {
  STUD_PRES_CLOSED,
  STUD_PRES_OPENED,
  URL_ADMIN_STUDENT_DETAIL,
  URL_PRESENTATIONS,
} from "../../../../constants";

function AcceptedStudentsList({
  acceptedStudents,
  subjectId,
  handleRejectStudent,
}) {
  return (
    <div className="mb-5">
      <h2>Potvrdení študenti</h2>

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

          <Button
            variant="outline-danger"
            size="sm"
            value={student.id}
            onClick={handleRejectStudent}
          >
            Zamietnuť
          </Button>

          <Link
            to={
              "/subject/" +
              subjectId +
              URL_ADMIN_STUDENT_DETAIL +
              "/" +
              student.id
            }
            className="btn btn-warning btn-sm ml-5 mr-2"
          >
            Hodnotenie
          </Link>

          {student.pres_status === undefined || student.pres_status === null || (
            <Link
              to={
                "/subject/" +
                subjectId +
                URL_PRESENTATIONS +
                "/" +
                student.presentation_id +
                "?is_opened=" +
                (student.pres_status == STUD_PRES_OPENED
                  ? "true"
                  : student.pres_status == STUD_PRES_CLOSED
                  ? "false"
                  : "neutral")
              }
              className="btn btn-success btn-sm"
            >
              Prezentácia
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default AcceptedStudentsList;
