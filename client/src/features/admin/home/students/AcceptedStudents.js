import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/utils/StringUtils";
import { REJECTED_TO_SUBJ } from "../../../../constants";
import {
  loadAcceptedStudents,
  getAcceptedStudents,
  updateStudentStatus,
  loadRejectedStudents,
} from "../homeSlice";
import AcceptedStudentsList from "./AcceptedStudentsList";

function AcceptedStudents() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const acceptedStudents = useSelector(getAcceptedStudents);

  useEffect(() => {
    if (subjectId) dispatch(loadAcceptedStudents(subjectId));
  }, [subjectId]);

  const handleRejectStudent = (e) => {
    dispatch(
      updateStudentStatus(subjectId, e.target.value, REJECTED_TO_SUBJ)
    ).then(() => {
      dispatch(loadAcceptedStudents(subjectId));
      dispatch(loadRejectedStudents(subjectId));
    });
  };

  return (
    <div>
      <h2>Potvrdení študenti</h2>
      {showLoaderIfAnyNull(acceptedStudents) || (
        <AcceptedStudentsList
          acceptedStudents={acceptedStudents}
          subjectId={subjectId}
          handleRejectStudent={handleRejectStudent}
        />
      )}
    </div>
  );
}

export default AcceptedStudents;
