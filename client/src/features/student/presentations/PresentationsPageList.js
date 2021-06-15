import React from "react";
import Container from "react-bootstrap/Container";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";
import StudentPresentationsList from "../home/presentations/StudentPresentationsList";
import TeacherPresentationsList from "../home/presentations/TeacherPresentationsList";
import MyPresentationList from "../home/presentations/MyPresentationList";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function PresentationsPageList({
  studentPresentationsOpened,
  studentPresentationsClosed,
  teacherPresentations,
  myPresentation,
  presentationWeight,
  subjectId,
  currentUserId,
  handleUpload,
  fileInputRef,
}) {
  return (
    <div>
      <h2 className="text-center mb-5">Všetky prezentácie</h2>

      <Container fluid>
        <h2 className="mb-3">Študentské prezentácie</h2>
        <Row className="mb-4">
          <Col lg="3">
            <h3>Moja prezentácia</h3>
            {showLoaderIfAnyNull(myPresentation, myPresentation) || (
              <MyPresentationList
                myPresentation={myPresentation}
                presentationWeight={presentationWeight}
                subjectId={subjectId}
                currentUserId={currentUserId}
                handleUpload={handleUpload}
                fileInputRef={fileInputRef}
                classname="mt-0"
              />
            )}
          </Col>

          <Col lg="5">
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
        <h2 className="mt-5">Učiteľské prezentácie</h2>
        {showLoaderIfAnyNull(teacherPresentations) || (
          <TeacherPresentationsList
            teacherPresentations={teacherPresentations}
            subjectId={subjectId}
          />
        )}
      </Container>
    </div>
  );
}

export default PresentationsPageList;
