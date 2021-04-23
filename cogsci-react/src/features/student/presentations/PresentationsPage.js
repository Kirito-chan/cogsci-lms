import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import {
  getMyPresentation,
  getPresentationWeight,
  getStudentPresentationsClosed,
  getStudentPresentationsOpened,
  getTeacherPresentations,
  loadMyPresentation,
  loadStudentPresentationsClosed,
  loadStudentPresentationsOpened,
  loadSubjectWeight,
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
  const presentationWeight = useSelector(getPresentationWeight);
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
      dispatch(loadSubjectWeight(currentUserId, subjectId));
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
        presentationWeight={presentationWeight}
      />
    </div>
  );
}

export default PresentationsPage;
