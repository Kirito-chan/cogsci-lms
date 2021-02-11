import React, { useEffect } from "react";
import TeacherPresentationsList from "./TeacherPresentationsList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import {
  loadTeacherPresentations,
  getTeacherPresentations,
} from "../homeSlice";
import { useParams } from "react-router";

function TeacherPresentations() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const currentUserId = useSelector(getCurrentUserId);
  const teacherPresentations = useSelector(getTeacherPresentations);

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadTeacherPresentations(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  return (
    <TeacherPresentationsList teacherPresentations={teacherPresentations} />
  );
}

export default TeacherPresentations;
