import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/StringUtils";
import { loadAcceptedStudents, getAcceptedStudents } from "../homeSlice";
import AcceptedStudentsList from "./AcceptedStudentsList";

function AcceptedStudents() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const acceptedStudents = useSelector(getAcceptedStudents);

  useEffect(() => {
    if (subjectId) dispatch(loadAcceptedStudents(subjectId));
  }, [subjectId]);

  return (
    showLoaderIfAnyNull(acceptedStudents) || (
      <AcceptedStudentsList
        acceptedStudents={acceptedStudents}
        subjectId={subjectId}
      />
    )
  );
}

export default AcceptedStudents;
