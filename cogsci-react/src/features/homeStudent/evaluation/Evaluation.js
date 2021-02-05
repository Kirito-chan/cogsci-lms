import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomeworks,
  getAttendance,
  getMyPresentation,
  loadMyPresentation,
  loadAttendance,
  loadHomeworks,
  loadSubjectValuation,
  getSubjectValuation,
} from "../homeStudentSlice";
import { getCurrentUser } from "../../../app/currentUserSlice";
import EvaluationTable from "./EvaluationTable";

export default function Evaluation() {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUser);
  const myPresentation = useSelector(getMyPresentation);
  const attendances = useSelector(getAttendance);
  const homeworks = useSelector(getHomeworks);
  const subjectValuation = useSelector(getSubjectValuation);

  useEffect(() => {
    dispatch(loadMyPresentation(currentUserId));
    dispatch(loadAttendance(currentUserId));
    dispatch(loadHomeworks(currentUserId));
    dispatch(loadSubjectValuation(currentUserId));
  }, []);

  return (
    <EvaluationTable
      presentation={myPresentation[0]}
      attendances={attendances}
      homeworks={homeworks}
      subjectValuation={subjectValuation}
    />
  );
}
