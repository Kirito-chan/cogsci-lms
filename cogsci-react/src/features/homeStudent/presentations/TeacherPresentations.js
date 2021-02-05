import React, { useEffect } from "react";
import TeacherPresentationsList from "./TeacherPresentationsList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../app/currentUserSlice";
import {
  loadTeacherPresentations,
  getTeacherPresentations,
} from "../homeStudentSlice";

function TeacherPresentations() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUser);
  const teacherPresentations = useSelector(getTeacherPresentations);

  useEffect(() => {
    dispatch(loadTeacherPresentations(currentUserId));
  }, []);

  return (
    <TeacherPresentationsList teacherPresentations={teacherPresentations} />
  );
}

export default TeacherPresentations;