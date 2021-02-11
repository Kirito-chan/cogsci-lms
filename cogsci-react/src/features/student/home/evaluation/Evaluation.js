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
} from "../homeSlice";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import EvaluationTable from "./EvaluationTable";
import { useParams } from "react-router";

export default function Evaluation() {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId);
  const myPresentation = useSelector(getMyPresentation);
  const attendances = useSelector(getAttendance);
  const bonuses = useSelector(getBonuses);
  const subjectValuation = useSelector(getSubjectValuation);
  const { subjectId } = useParams();

  useEffect(() => {
    if (currentUserId && subjectId) {
      dispatch(loadMyPresentation(currentUserId, subjectId));
      dispatch(loadAttendance(currentUserId, subjectId));
      dispatch(loadBonuses(currentUserId, subjectId));
      dispatch(loadSubjectValuation(subjectId));
    }
  }, [currentUserId, subjectId]);

  return (
    <EvaluationTable
      presentation={myPresentation[0]}
      attendances={attendances}
      bonuses={bonuses}
      subjectValuation={subjectValuation}
    />
  );
}
