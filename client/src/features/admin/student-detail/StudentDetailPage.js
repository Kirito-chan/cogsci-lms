import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Navigation from "../../../components/navigations/Navigation";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";
import Evaluation from "./Evaluation";
import { getStudent, loadStudent } from "./studentDetailSlice";
import Attendance from "./Attendance";
import Bonus from "./Bonus";
import Presentation from "./Presentation";

function StudentDetailPage() {
  const { studentId, subjectId } = useParams();
  const dispatch = useDispatch();
  const student = useSelector(getStudent);

  useEffect(() => {
    if (studentId && subjectId) dispatch(loadStudent(studentId, subjectId));
  }, [studentId, subjectId]);

  return (
    <div>
      <Navigation />
      {showLoaderIfAnyNull(student) || (
        <Container fluid>
          <h1 className="text-center">
            {student.first_name} {student.last_name}
          </h1>
          <Row className="mt-5">
            <Col></Col>
            <Col md="6">
              <Evaluation student={student} />
            </Col>
            <Col></Col>
          </Row>
          <Row className="mt-5">
            <Col md="6">
              <Attendance student={student} />
            </Col>
            <Col md="6">
              <Bonus student={student} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Presentation student={student} />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default StudentDetailPage;
