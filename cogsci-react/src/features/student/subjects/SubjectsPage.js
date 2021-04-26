import React, { useEffect } from "react";
import SubjectsPageList from "./SubjectsPageList";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserId,
  loadUserAndToken,
} from "../../../app/currentUserSlice";
import {
  loadSubjects,
  getSubjects,
  clearCurrentSubject,
  getCurrentSubjectId,
} from "./subjectsSlice";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";
import { resetState } from "../../../app/actions";
import jwt from "jwt-decode";

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
      const token = localStorage.getItem("token");
      const user = jwt(token);
      dispatch(loadUserAndToken(user.username, user.password));
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
