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
  loadSubjectWeight,
  getPresentationWeight,
  getAttendanceWeight,
  getCommentsWeight,
} from "./studentDetailSlice";
import { useParams } from "react-router";
import EvaluationTable from "../../student/home/evaluation/EvaluationTable";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";
import {
  getCurrentSubjectNumOfBonuses,
  getCurrentSubjectNumOfWeeks,
} from "../subjects/subjectsSlice";

export default function Evaluation({ student }) {
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const studentId = student.id;
  const myPresentation = useSelector(getMyPresentation);
  const presentationWeight = useSelector(getPresentationWeight);
  const attendanceWeight = useSelector(getAttendanceWeight);
  const commentsWeight = useSelector(getCommentsWeight);
  const attendances = useSelector(getAttendance);
  const bonuses = useSelector(getBonuses);
  const subjectValuation = useSelector(getSubjectValuation);
  const currentSubjectNumOfWeeks = useSelector(getCurrentSubjectNumOfWeeks);
  const currentSubjectNumOfBonuses = useSelector(getCurrentSubjectNumOfBonuses);

  useEffect(() => {
    if (studentId && subjectId) {
      dispatch(loadMyPresentation(studentId, subjectId));
      dispatch(loadAttendance(studentId, subjectId));
      dispatch(loadBonuses(studentId, subjectId));
      dispatch(loadSubjectValuation(subjectId));
      dispatch(loadSubjectWeight(subjectId));
    }
  }, [studentId, subjectId]);

  return (
    showLoaderIfAnyNull(
      attendances,
      bonuses,
      subjectValuation,
      myPresentation,
      currentSubjectNumOfWeeks
    ) || (
      <EvaluationTable
        presentation={myPresentation}
        presentationWeight={presentationWeight}
        attendanceWeight={attendanceWeight}
        commentsWeight={commentsWeight}
        attendances={attendances}
        bonuses={bonuses}
        subjectValuation={subjectValuation}
        currentSubjectNumOfWeeks={currentSubjectNumOfWeeks}
        currentSubjectNumOfBonuses={currentSubjectNumOfBonuses}
      />
    )
  );
}
