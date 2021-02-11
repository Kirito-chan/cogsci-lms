import React, { useEffect } from "react";
import StudentPresentationsList from "./StudentPresentationsList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import {
  loadStudentPresentations,
  getStudentPresentations,
} from "../homeSlice";
import { useParams } from "react-router";

function StudentPresentations() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const studentPresentations = useSelector(getStudentPresentations);
  const { subjectId } = useParams();

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadStudentPresentations(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  return (
    <StudentPresentationsList studentPresentations={studentPresentations} />
  );
}

export default StudentPresentations;
