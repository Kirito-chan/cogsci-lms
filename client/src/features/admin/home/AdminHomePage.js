import React, { useEffect } from "react";
import Navigation from "../../../components/navigations/Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { getCurrentSubjectName } from "../subjects/subjectsSlice";
import PendingStudents from "./students/PendingStudents";
import AcceptedStudents from "./students/AcceptedStudents";
import RejectedStudents from "./students/RejectedStudents";
import Attendance from "./attendance/Attendance";

function AdminHomePage() {
  const subjectName = useSelector(getCurrentSubjectName);

  useEffect(() => {
    document.title = "Domov · " + (subjectName ? subjectName : "");
  }, [subjectName]);

  return (
    <div>
      <Navigation />

      <Container fluid>
        <Row>
          <Col>
            <h2 className="text-center mb-5">{subjectName}</h2>
          </Col>
        </Row>
        <Row>
          <Col xl={4} md={6}>
            <div className="pl-sm-4">
              <PendingStudents />
              <AcceptedStudents />
              <RejectedStudents />
            </div>
          </Col>

          <Col xl={6} md={6}>
            <Attendance />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminHomePage;
