import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/StringUtils";
import { loadRejectedStudents, getRejectedStudents } from "../homeSlice";
import RejectedStudentsList from "./RejectedStudentsList";

function RejectedStudents() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const rejectedStudents = useSelector(getRejectedStudents);

  useEffect(() => {
    if (subjectId) dispatch(loadRejectedStudents(subjectId));
  }, [subjectId]);

  return (
    showLoaderIfAnyNull(rejectedStudents) || (
      <RejectedStudentsList
        rejectedStudents={rejectedStudents}
        subjectId={subjectId}
      />
    )
  );
}

export default RejectedStudents;
