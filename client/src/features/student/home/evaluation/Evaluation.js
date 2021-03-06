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
} from "../homeSlice";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import EvaluationTable from "./EvaluationTable";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/utils/StringUtils";
import {
  getCurrentSubjectNumOfBonuses,
  getCurrentSubjectNumOfWeeks,
} from "../../subjects/subjectsSlice";

export default function Evaluation() {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId);
  const myPresentation = useSelector(getMyPresentation);
  const attendances = useSelector(getAttendance);
  const bonuses = useSelector(getBonuses);
  const subjectValuation = useSelector(getSubjectValuation);
  const presentationWeight = useSelector(getPresentationWeight);
  const attendanceWeight = useSelector(getAttendanceWeight);
  const commentsWeight = useSelector(getCommentsWeight);
  const currentSubjectNumOfWeeks = useSelector(getCurrentSubjectNumOfWeeks);
  const currentSubjectNumOfBonuses = useSelector(getCurrentSubjectNumOfBonuses);
  const { subjectId } = useParams();

  useEffect(() => {
    if (currentUserId && subjectId) {
      dispatch(loadMyPresentation(currentUserId, subjectId));
      dispatch(loadAttendance(currentUserId, subjectId));
      dispatch(loadBonuses(currentUserId, subjectId));
      dispatch(loadSubjectValuation(subjectId));
      dispatch(loadSubjectWeight(subjectId));
    }
  }, [currentUserId, subjectId]);

  return (
    <div>
      <h2>Celkové hodnotenie</h2>
      {showLoaderIfAnyNull(
        attendances,
        bonuses,
        subjectValuation,
        myPresentation,
        presentationWeight,
        attendanceWeight,
        commentsWeight,
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
      )}
    </div>
  );
}
