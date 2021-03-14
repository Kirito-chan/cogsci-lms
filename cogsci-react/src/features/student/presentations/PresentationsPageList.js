import React from "react";
import Container from "react-bootstrap/Container";
import { showLoaderIfNull } from "../../../components/StringUtils";
import StudentPresentationsList from "../home/presentations/StudentPresentationsList";
import TeacherPresentationsList from "../home/presentations/TeacherPresentationsList";
import MyPresentationList from "../home/presentations/MyPresentationList";

function PresentationsPageList({
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
        {showLoaderIfNull(studentPresentationsOpened) || (
          <StudentPresentationsList
            studentPresentations={studentPresentationsOpened}
            textForStatus="– otvorené na hodnotenie"
            subjectId={subjectId}
          />
        )}

        <div className="my-4">
          {showLoaderIfNull(studentPresentationsClosed) || (
            <StudentPresentationsList
              studentPresentations={studentPresentationsClosed}
              textForStatus="– uzavreté hodnotenie"
              hideHodnotitBtn={true}
              subjectId={subjectId}
            />
          )}
        </div>

        {showLoaderIfNull(teacherPresentations) || (
          <TeacherPresentationsList
            teacherPresentations={teacherPresentations}
          />
        )}

        {showLoaderIfNull(myPresentation) || (
          <MyPresentationList
            myPresentation={myPresentation.presentation}
            presentationWeight={myPresentation.presentationWeight}
            subjectId={subjectId}
          />
        )}
      </Container>
    </div>
  );
}

export default PresentationsPageList;
