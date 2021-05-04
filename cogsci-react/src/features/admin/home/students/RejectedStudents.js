import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/StringUtils";
import { ACCEPTED_TO_SUBJ } from "../../../../constants";
import {
  loadRejectedStudents,
  getRejectedStudents,
  updateStudentStatus,
  loadAcceptedStudents,
} from "../homeSlice";
import RejectedStudentsList from "./RejectedStudentsList";

function RejectedStudents() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const rejectedStudents = useSelector(getRejectedStudents);

  useEffect(() => {
    if (subjectId) dispatch(loadRejectedStudents(subjectId));
  }, [subjectId]);

  const handleAcceptStudent = (e) => {
    dispatch(
      updateStudentStatus(subjectId, e.target.value, ACCEPTED_TO_SUBJ)
    ).then(() => {
      dispatch(loadRejectedStudents(subjectId));
      dispatch(loadAcceptedStudents(subjectId));
    });
  };

  return (
    showLoaderIfAnyNull(rejectedStudents) || (
      <RejectedStudentsList
        rejectedStudents={rejectedStudents}
        subjectId={subjectId}
        handleAcceptStudent={handleAcceptStudent}
      />
    )
  );
}

export default RejectedStudents;