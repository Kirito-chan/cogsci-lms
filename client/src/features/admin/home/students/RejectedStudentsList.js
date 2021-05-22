import React from "react";
import Button from "react-bootstrap/Button";
import "./SmallerButtons.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RejectedStudentsList({ rejectedStudents, handleAcceptStudent }) {
  const isEmpty = rejectedStudents.length === 0;
  return (
    <div className={"mb-5 " + (isEmpty ? "d-none" : "")}>
      {rejectedStudents.map((student, i) => (
        <Row key={i}>
          <Col lg={6} xs={7}>
            <p className="d-inline-block text-left">
              {student.last_name} {student.first_name}
            </p>
          </Col>
          <Col lg={1} xs={1}>
            <Button
              variant="success"
              size="sm"
              className="ml-2 my-btn-small"
              value={student.id}
              onClick={handleAcceptStudent}
            >
              Potvrdiť
            </Button>
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default RejectedStudentsList;
