import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBonuses,
  getAttendance,
  getMyPresentation,
  loadMyPresentation,
  loadAttendance,
  loadBonuses,
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
  const bonuses = useSelector(getBonuses);
  const subjectValuation = useSelector(getSubjectValuation);

  useEffect(() => {
    dispatch(loadMyPresentation(currentUserId));
    dispatch(loadAttendance(currentUserId));
    dispatch(loadBonuses(currentUserId));
    dispatch(loadSubjectValuation(currentUserId));
  }, []);

  return (
    <EvaluationTable
      presentation={myPresentation[0]}
      attendances={attendances}
      bonuses={bonuses}
      subjectValuation={subjectValuation}
    />
  );
}
