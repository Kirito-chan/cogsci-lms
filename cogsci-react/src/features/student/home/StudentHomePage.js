import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "../../../components/navigations/Navigation";
import Attendance from "./attendance/Attendance";
import Bonuses from "./bonuses/Bonuses";
import AllPresentations from "./presentations/AllPresentations";
import TeacherPresentations from "./presentations/TeacherPresentations";
import StudentPresentations from "./presentations/StudentPresentations";
import MyPresentation from "./presentations/MyPresentation";
import Evaluation from "./evaluation/Evaluation";
import { useSelector } from "react-redux";
import { getCurrentSubjectName } from "../subjects/subjectsSlice";

function StudentHomePage() {
  const subjectName = useSelector(getCurrentSubjectName);

  useEffect(() => {
    document.title = "Domov · " + (subjectName ? subjectName : "");
  }, [subjectName]);

  return (
    <div>
      <Navigation />

      <section>
        <Container fluid>
          <Row>
            <Col>
              <h2 className="text-center mb-5">{subjectName}</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <AllPresentations />
              <TeacherPresentations />
              <StudentPresentations />
              <MyPresentation />
            </Col>

            <Col lg={6}>
              <div className="pl-lg-4">
                <Attendance />
                <Bonuses />
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <Evaluation />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default StudentHomePage;
