import React, { useEffect } from "react";
import TeacherPresentationsList from "./TeacherPresentationsList";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTeacherPresentations,
  getTeacherPresentations,
} from "../homeSlice";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/StringUtils";
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
    showLoaderIfAnyNull(teacherPresentations) || (
      <TeacherPresentationsList
        teacherPresentations={teacherPresentations}
        subjectId={subjectId}
      />
    )
  );
}

export default TeacherPresentations;
