import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SUBJ_IS_ACTIVE } from "../../../constants";
import Grades from "./Grades";
import PresentationCriteria from "./PresentationCriteria";
import SubjectParameters from "./SubjectParameters";

function SettingsPageView({ subjectStatus, changeSubjectStatus }) {
  const isActive = subjectStatus === SUBJ_IS_ACTIVE;
  return (
    <div>
      <h1 className="text-center">Nastavenia</h1>
      {
        <Container>
          <Row>
            <Col>
              <h2>Stav predmetu</h2>
              <p>{isActive ? "Aktívny" : "Neaktívny"}</p>
              <Button
                variant={isActive ? "outline-danger" : "outline-success"}
                size="sm"
                onClick={changeSubjectStatus}
              >
                {isActive ? "Deaktivovať" : "Aktivovať"}
              </Button>
            </Col>
          </Row>
          <Row className="mt-4 pb-5">
            <Col lg="4">
              <Grades />
            </Col>
            <Col lg="7" className="ml-lg-5 mt-4 mt-lg-0">
              <PresentationCriteria />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <SubjectParameters />
            </Col>
          </Row>
        </Container>
      }
    </div>
  );
}

export default SettingsPageView;
