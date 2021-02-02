import React, { useEffect } from "react";
import StudentPresentationsList from "./StudentPresentationsList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../app/currentUserSlice";
import {
  loadStudentPresentations,
  getStudentPresentations,
} from "../homeStudentSlice";

function StudentPresentations() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUser);
  const studentPresentations = useSelector(getStudentPresentations);

  useEffect(() => {
    dispatch(loadStudentPresentations(currentUserId));
  }, []);

  return (
    <StudentPresentationsList studentPresentations={studentPresentations} />
  );
}

export default StudentPresentations;
