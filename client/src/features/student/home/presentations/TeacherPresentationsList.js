import React from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import { URL_PRESENTATIONS } from "../../../../constants";
import Discussion from "../Discussion";
import DeleteButton from "../../presentation/DeleteButton";

function TeacherPresentationsList({ teacherPresentations, subjectId }) {
  return (
    <div className="mb-4">
      {teacherPresentations.length !== 0 || (
        <p className="text-secondary">Žiadne</p>
      )}

      {teacherPresentations.map((presentation, i) => (
        <div key={presentation.id}>
          <Container fluid>
            <Row>
              <Col xs="auto" className="pl-0">
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
              </Col>
            </Row>
            <Row>
              <Col xs="auto" className="mr-md-4 mr-sm-4 mr-lg-0 mr-2 pl-0">
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
                  isTeacherPres={true}
                />
              </Col>
              <Col xs={1}>
                <DeleteButton
                  presentation={presentation}
                  isTeacherPres={true}
                />
              </Col>
            </Row>
          </Container>
        </div>
      ))}
    </div>
  );
}

export default TeacherPresentationsList;
