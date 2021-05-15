import React, { useEffect, useRef } from "react";
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
  uploadPresentation,
} from "../home/homeSlice";
import Navigation from "../../../components/navigations/Navigation";
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
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = "Prezentácie";
  }, []);

  useEffect(() => {
    if (currentUserId && subjectId) {
      dispatch(loadStudentPresentationsOpened(currentUserId, subjectId));
      dispatch(loadStudentPresentationsClosed(currentUserId, subjectId));
      dispatch(loadTeacherPresentations(currentUserId, subjectId));
      dispatch(loadMyPresentation(currentUserId, subjectId));
      dispatch(loadSubjectWeight(subjectId));
    }
  }, [currentUserId, subjectId]);

  const handleUpload = (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];

    dispatch(
      uploadPresentation(
        file,
        subjectId,
        currentUserId,
        false,
        myPresentation.status
      )
    ).then((res) => {
      if (res) {
        const userId = res.payload.userId;
        const subjectId = res.payload.subjectId;
        dispatch(loadMyPresentation(userId, subjectId));
        dispatch(loadStudentPresentationsOpened(userId, subjectId));
      }
    });
  };

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
        currentUserId={currentUserId}
        handleUpload={handleUpload}
        fileInputRef={fileInputRef}
      />
    </div>
  );
}

export default PresentationsPage;
