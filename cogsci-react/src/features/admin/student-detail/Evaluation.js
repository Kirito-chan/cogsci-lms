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
} from "./studentDetailSlice";
import { useParams } from "react-router";
import EvaluationTable from "../../student/home/evaluation/EvaluationTable";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";

export default function Evaluation({ student }) {
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const studentId = student.id;
  const myPresentation = useSelector(getMyPresentation);
  const attendances = useSelector(getAttendance);
  const bonuses = useSelector(getBonuses);
  const subjectValuation = useSelector(getSubjectValuation);

  useEffect(() => {
    if (studentId && subjectId) {
      dispatch(loadMyPresentation(studentId, subjectId));
      dispatch(loadAttendance(studentId, subjectId));
      dispatch(loadBonuses(studentId, subjectId));
      dispatch(loadSubjectValuation(subjectId));
    }
  }, [studentId, subjectId]);

  return (
    showLoaderIfAnyNull(
      attendances,
      bonuses,
      subjectValuation,
      myPresentation
    ) || (
      <EvaluationTable
        presentation={myPresentation.presentation}
        presentationWeight={myPresentation.presentationWeight}
        attendances={attendances}
        bonuses={bonuses}
        subjectValuation={subjectValuation}
      />
    )
  );
}
