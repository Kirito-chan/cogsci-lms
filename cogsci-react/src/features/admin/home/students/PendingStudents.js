import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/StringUtils";
import { ACCEPTED_TO_SUBJ, REJECTED_TO_SUBJ } from "../../../../constants";
import {
  loadPendingStudents,
  getPendingStudents,
  updateStudentStatus,
  loadAcceptedStudents,
  loadRejectedStudents,
} from "../homeSlice";
import PendingStudentsList from "./PendingStudentsList";

function PendingStudents() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const pendingStudents = useSelector(getPendingStudents);

  useEffect(() => {
    if (subjectId) dispatch(loadPendingStudents(subjectId));
  }, [subjectId]);

  const handleAcceptStudent = (e) => {
    dispatch(
      updateStudentStatus(subjectId, e.target.value, ACCEPTED_TO_SUBJ)
    ).then(() => {
      dispatch(loadPendingStudents(subjectId));
      dispatch(loadAcceptedStudents(subjectId));
    });
  };

  const handleRejectStudent = (e) => {
    dispatch(
      updateStudentStatus(subjectId, e.target.value, REJECTED_TO_SUBJ)
    ).then(() => {
      dispatch(loadPendingStudents(subjectId));
      dispatch(loadRejectedStudents(subjectId));
    });
  };

  return (
    showLoaderIfAnyNull(pendingStudents) || (
      <PendingStudentsList
        pendingStudents={pendingStudents}
        subjectId={subjectId}
        handleAcceptStudent={handleAcceptStudent}
        handleRejectStudent={handleRejectStudent}
      />
    )
  );
}

export default PendingStudents;
