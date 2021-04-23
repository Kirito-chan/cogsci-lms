import React from "react";
import Container from "react-bootstrap/Container";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";
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
            {showLoaderIfAnyNull(
              studentPresentationsNeutral,
              myPresentation
            ) || (
              <StudentPresentationsList
                studentPresentations={studentPresentationsNeutral}
                headerText="Prijaté na feedback"
                subjectId={subjectId}
                myPresentationId={myPresentation.id}
                hideEvalDiscussion={true}
              />
            )}
          </Col>

          <Col lg="4" className="my-4 my-lg-0">
            {showLoaderIfAnyNull(
              studentPresentationsOpened,
              myPresentation
            ) || (
              <StudentPresentationsList
                studentPresentations={studentPresentationsOpened}
                headerText="Otvorené na hodnotenie"
                subjectId={subjectId}
                myPresentationId={myPresentation.id}
              />
            )}
          </Col>

          <Col lg="4">
            <div>
              {showLoaderIfAnyNull(
                studentPresentationsClosed,
                myPresentation
              ) || (
                <StudentPresentationsList
                  studentPresentations={studentPresentationsClosed}
                  headerText="Uzavreté hodnotenie"
                  hideHodnotitBtn={true}
                  subjectId={subjectId}
                  myPresentationId={myPresentation.id}
                />
              )}
            </div>
          </Col>
        </Row>

        {showLoaderIfAnyNull(teacherPresentations) || (
          <TeacherPresentationsList
            teacherPresentations={teacherPresentations}
            h2="true"
            subjectId={subjectId}
          />
        )}

        <UploadTeacherPresentations />
      </Container>
    </div>
  );
}

export default PresentationsPageList;
