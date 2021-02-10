import React, { useEffect } from "react";
import TeacherPresentationsList from "./TeacherPresentationsList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import {
  loadTeacherPresentations,
  getTeacherPresentations,
} from "../homeSlice";

function TeacherPresentations() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const teacherPresentations = useSelector(getTeacherPresentations);

  useEffect(() => {
    if (currentUserId) dispatch(loadTeacherPresentations(currentUserId));
  }, [currentUserId]);

  return (
    <TeacherPresentationsList teacherPresentations={teacherPresentations} />
  );
}

export default TeacherPresentations;
