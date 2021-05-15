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
          />
        )}
      </Container>
    </div>
  );
}

export default PresentationsPageList;
