import React, { useEffect } from "react";
import StudentPresentationsList from "./StudentPresentationsList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import {
  getStudentPresentationsOpened,
  loadStudentPresentationsOpened,
} from "../homeSlice";
import { useParams } from "react-router";
import { showLoaderIfNull } from "../../../../components/StringUtils";

function StudentPresentations() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const studentPresentations = useSelector(getStudentPresentationsOpened);
  const { subjectId } = useParams();

  useEffect(() => {
    if (currentUserId && subjectId) {
      dispatch(loadStudentPresentationsOpened(currentUserId, subjectId));
    }
  }, [currentUserId, subjectId]);

  return (
    <div>
      {showLoaderIfNull(studentPresentations) || (
        <StudentPresentationsList
          studentPresentations={studentPresentations}
          subjectId={subjectId}
        />
      )}
    </div>
  );
}

export default StudentPresentations;
