import React, { useEffect } from "react";
import TeacherPresentationsList from "./TeacherPresentationsList";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTeacherPresentations,
  getTeacherPresentations,
} from "../homeSlice";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/utils/StringUtils";
import { getCurrentUserId } from "../../../../app/currentUserSlice";

function TeacherPresentations() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const { subjectId } = useParams();
  const teacherPresentations = useSelector(getTeacherPresentations);

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadTeacherPresentations(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  return (
    <div>
      <h3>Učiteľské prezentácie</h3>
      {showLoaderIfAnyNull(teacherPresentations) || (
        <TeacherPresentationsList
          teacherPresentations={teacherPresentations}
          subjectId={subjectId}
        />
      )}
    </div>
  );
}

export default TeacherPresentations;
