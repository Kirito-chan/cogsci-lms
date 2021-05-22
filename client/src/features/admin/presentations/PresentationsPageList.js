import React from "react";
import Container from "react-bootstrap/Container";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";
import StudentPresentationsList from "../../student/home/presentations/StudentPresentationsList";
import TeacherPresentationsList from "../../student/home/presentations/TeacherPresentationsList";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UploadTeacherPresentations from "./UploadTeacherPresentations";

function PresentationsPageList({
  studentPresentationsNeutral,
  studentPresentationsOpened,
  studentPresentationsClosed,
  teacherPresentations,
  myPresentation,
  subjectId,
}) {
  return (
    <div>
      <h2 className="text-center mb-5">Všetky prezentácie</h2>

      <Container fluid>
        <h2 className="mb-3">Študentské prezentácie</h2>
        <Row className="mb-4">
          <Col lg="4">
            <h3>Prijaté na feedback</h3>
            {showLoaderIfAnyNull(
              studentPresentationsNeutral,
              myPresentation
            ) || (
              <StudentPresentationsList
                studentPresentations={studentPresentationsNeutral}
                subjectId={subjectId}
                myPresentationId={myPresentation.id}
                hideEvalDiscussion={true}
              />
            )}
          </Col>

          <Col lg="4" className="my-4 my-lg-0">
            <h3>Otvorené hodnotenie</h3>
            {showLoaderIfAnyNull(
              studentPresentationsOpened,
              myPresentation
            ) || (
              <StudentPresentationsList
                studentPresentations={studentPresentationsOpened}
                subjectId={subjectId}
                myPresentationId={myPresentation.id}
              />
            )}
          </Col>

          <Col lg="4">
            <div>
              <h3>Uzavreté hodnotenie</h3>
              {showLoaderIfAnyNull(
                studentPresentationsClosed,
                myPresentation
              ) || (
                <StudentPresentationsList
                  studentPresentations={studentPresentationsClosed}
                  hideHodnotitBtn={true}
                  subjectId={subjectId}
                  myPresentationId={myPresentation.id}
                />
              )}
            </div>
          </Col>
        </Row>
        <div>
          <h2 className="mt-5">Učiteľské prezentácie</h2>
          {showLoaderIfAnyNull(teacherPresentations) || (
            <TeacherPresentationsList
              teacherPresentations={teacherPresentations}
              subjectId={subjectId}
            />
          )}
        </div>

        <UploadTeacherPresentations />
      </Container>
    </div>
  );
}

export default PresentationsPageList;
