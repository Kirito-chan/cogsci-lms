import React from "react";
import Button from "react-bootstrap/Button";

function PendingStudentsList({ pendingStudents }) {
  const isEmpty = pendingStudents.length === 0;
  return (
    <div className={"mb-5 " + (isEmpty ? "d-none" : "")}>
      <h3>Nepotvrdení študenti</h3>

      {pendingStudents.map((student) => (
        <div key={student.id} className="d-flex justify-content-between">
          <p>
            {student.last_name} {student.first_name}
          </p>
          <div>
            <Button variant="outline-danger" size="sm">
              Zamietnuť
            </Button>
            <Button variant="success" size="sm" className="ml-2 mr-5">
              Potvrdiť
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PendingStudentsList;
