import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/StringUtils";
import { loadPendingStudents, getPendingStudents } from "../homeSlice";
import PendingStudentsList from "./PendingStudentsList";

function PendingStudents() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const pendingStudents = useSelector(getPendingStudents);

  useEffect(() => {
    if (subjectId) dispatch(loadPendingStudents(subjectId));
  }, [subjectId]);

  return (
    showLoaderIfAnyNull(pendingStudents) || (
      <PendingStudentsList
        pendingStudents={pendingStudents}
        subjectId={subjectId}
      />
    )
  );
}

export default PendingStudents;
