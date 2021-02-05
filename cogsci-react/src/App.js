import React, { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation";
import Attendance from "./features/homeStudent/attendance/Attendance";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getLoading } from "./features/homeStudent/homeStudentSlice";
import HomeWorks from "./features/homeStudent/homeworks/HomeWorks";
import AllPresentations from "./features/homeStudent/presentations/AllPresentations";
import TeacherPresentations from "./features/homeStudent/presentations/TeacherPresentations";
import StudentPresentations from "./features/homeStudent/presentations/StudentPresentations";
import MyPresentation from "./features/homeStudent/presentations/MyPresentation";
import Evaluation from "./features/homeStudent/evaluation/Evaluation";

function App() {
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    document.body.style.cursor = isLoading ? "progress" : "";
  });

  return (
    <div className="App">
      <Navigation />
      <h1 className="text-center">Kognitívne vedy: mozog a myseľ</h1>
      <section className="App-header">
        <Container fluid>
          <Row>
            <Col lg={6}>
              <Attendance />
              <HomeWorks />
              <Evaluation />
            </Col>

            <Col lg={6}>
              <div className="pl-lg-5">
                <AllPresentations />
                <TeacherPresentations />
                <StudentPresentations />
                <MyPresentation />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default App;
