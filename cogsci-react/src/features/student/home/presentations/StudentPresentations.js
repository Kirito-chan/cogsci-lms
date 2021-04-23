import React, { useEffect } from "react";
import StudentPresentationsList from "./StudentPresentationsList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import {
  getMyPresentation,
  getStudentPresentationsOpened,
  loadMyPresentation,
  loadStudentPresentationsOpened,
} from "../homeSlice";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/StringUtils";

function StudentPresentations() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const studentPresentations = useSelector(getStudentPresentationsOpened);
  const myPresentation = useSelector(getMyPresentation);
  const { subjectId } = useParams();

  useEffect(() => {
    if (currentUserId && subjectId) {
      dispatch(loadStudentPresentationsOpened(currentUserId, subjectId));
      dispatch(loadMyPresentation(currentUserId, subjectId));
    }
  }, [currentUserId, subjectId]);

  return (
    <div>
      {showLoaderIfAnyNull(studentPresentations, myPresentation) || (
        <StudentPresentationsList
          studentPresentations={studentPresentations}
          subjectId={subjectId}
          myPresentationId={myPresentation.id}
          headerText="Študentské prezentácie"
        />
      )}
    </div>
  );
}

export default StudentPresentations;
