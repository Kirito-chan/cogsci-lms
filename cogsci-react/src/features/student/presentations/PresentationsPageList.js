import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import formatTranslation from "../../../components/StringUtils";
import { URL_PRESENTATIONS } from "../../../constants";
import StudentPresentationsList from "../home/presentations/StudentPresentationsList";
import TeacherPresentationsList from "../home/presentations/TeacherPresentationsList";

function PresentationsPageList({
  studentPresentationsOpened,
  studentPresentationsClosed,
  teacherPresentations,
  myPresentation,
  subjectId,
}) {
  const myPresentations = myPresentation.presentations;
  const myPresentationWeight = myPresentation.presentationWeight;

  return (
    <div>
      <h2 className="text-center mb-5">Všetky prezentácie</h2>
      <Container fluid>
        <StudentPresentationsList
          studentPresentations={studentPresentationsOpened}
          textForStatus="– otvorené na hodnotenie"
          subjectId={subjectId}
        />
        <div className="my-4">
          <StudentPresentationsList
            studentPresentations={studentPresentationsClosed}
            textForStatus="– uzavreté hodnotenie"
            hideHodnotitBtn={true}
            subjectId={subjectId}
          />
        </div>

        <TeacherPresentationsList teacherPresentations={teacherPresentations} />

        <h3>Moja prezentácia</h3>

        {myPresentations.length ? (
          ""
        ) : (
          <div className="mb-5">
            <span className="text-secondary">Neodovzdaná prezentácia</span>
          </div>
        )}
        {myPresentations.map((presentation, i) => (
          <article key={i}>
            <Row>
              <Link
                // prettier-ignore
                to={"/subject/" + subjectId + URL_PRESENTATIONS + "/" + presentation.id}
                className="nav-link"
              >
                {presentation.title}
              </Link>
            </Row>
            <Row>
              <Col>
                <p>
                  <b>Hodnotenie:</b> {presentation.points} z{" "}
                  {myPresentationWeight}{" "}
                  {formatTranslation(myPresentationWeight, "bod")}
                </p>
              </Col>
            </Row>
          </article>
        ))}
      </Container>
    </div>
  );
}

export default PresentationsPageList;
