import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import {
  getMyPresentation,
  getStudentPresentationsClosed,
  getStudentPresentationsOpened,
  getTeacherPresentations,
  loadMyPresentation,
  loadStudentPresentationsClosed,
  loadStudentPresentationsOpened,
  loadTeacherPresentations,
} from "../home/homeSlice";
import Navigation from "../../../components/Navigation";
import PresentationsPageList from "./PresentationsPageList";

function PresentationsPage() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const studentPresentationsOpened = useSelector(getStudentPresentationsOpened);
  const studentPresentationsClosed = useSelector(getStudentPresentationsClosed);
  const teacherPresentations = useSelector(getTeacherPresentations);
  const myPresentation = useSelector(getMyPresentation);
  const currentUserId = useSelector(getCurrentUserId);

  useEffect(() => {
    document.title = "Prezentácie";
  }, []);

  useEffect(() => {
    if (currentUserId && subjectId) {
      dispatch(loadStudentPresentationsOpened(currentUserId, subjectId));
      dispatch(loadStudentPresentationsClosed(currentUserId, subjectId));
      dispatch(loadTeacherPresentations(currentUserId, subjectId));
      dispatch(loadMyPresentation(currentUserId, subjectId));
    }
  }, [currentUserId, subjectId]);

  return (
    <div>
      <Navigation />
      <PresentationsPageList
        studentPresentationsOpened={studentPresentationsOpened}
        studentPresentationsClosed={studentPresentationsClosed}
        teacherPresentations={teacherPresentations}
        myPresentation={myPresentation}
        subjectId={subjectId}
      />
    </div>
  );
}

export default PresentationsPage;
