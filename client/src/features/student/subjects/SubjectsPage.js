import React, { useEffect } from "react";
import SubjectsPageList from "./SubjectsPageList";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserId,
  loadUserAndTokenWithToken,
} from "../../../app/currentUserSlice";
import {
  loadSubjects,
  getSubjects,
  clearCurrentSubject,
  getCurrentSubjectId,
} from "./subjectsSlice";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";
import { resetState } from "../../../app/actions";

function SubjectsPage() {
  const dispatch = useDispatch();
  const subjects = useSelector(getSubjects);
  const currentUserId = useSelector(getCurrentUserId);
  const currentSubjectId = useSelector(getCurrentSubjectId);

  useEffect(() => {
    document.title = "Predmety · Kognitívne vedy";
  }, []);

  useEffect(() => {
    if (currentUserId) {
      dispatch(loadSubjects(currentUserId));
    }
  }, [currentUserId]);

  useEffect(() => {
    dispatch(resetState()).then(() => {
      dispatch(loadUserAndTokenWithToken());
    });
  }, []);

  useEffect(() => {
    dispatch(clearCurrentSubject);
  }, [currentSubjectId]);

  return (
    showLoaderIfAnyNull(subjects) || (
      <SubjectsPageList subjects={subjects} currentUserId={currentUserId} />
    )
  );
}

export default SubjectsPage;
