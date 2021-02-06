import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "../../components/Navigation";
import Attendance from "./attendance/Attendance";
import Bonuses from "./bonuses/Bonuses";
import AllPresentations from "./presentations/AllPresentations";
import TeacherPresentations from "./presentations/TeacherPresentations";
import StudentPresentations from "./presentations/StudentPresentations";
import MyPresentation from "./presentations/MyPresentation";
import Evaluation from "./evaluation/Evaluation";

function StudentHomePage() {
  return (
    <div>
      <Navigation />
      <h1 className="text-center">Kognitívne vedy: mozog a myseľ</h1>
      <section className="App-header">
        <Container fluid>
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
                <Evaluation />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default StudentHomePage;
