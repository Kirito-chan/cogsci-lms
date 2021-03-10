import React, { useEffect } from "react";
import SubjectsPageList from "./SubjectsPageList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import {
  loadSubjects,
  getSubjects,
  clearCurrentSubject,
  getCurrentSubjectId,
} from "./subjectsSlice";

function SubjectsPage() {
  const dispatch = useDispatch();
  const subjects = useSelector(getSubjects);
  const currentUserId = useSelector(getCurrentUserId);
  const currentSubjectId = useSelector(getCurrentSubjectId);

  useEffect(() => {
    document.title = "Predmety · Kognitívne vedy";
  }, []);

  useEffect(() => {
    if (currentUserId) dispatch(loadSubjects(currentUserId));
  }, [currentUserId]);

  useEffect(() => {
    dispatch(clearCurrentSubject);
  }, [currentSubjectId]);

  return <SubjectsPageList subjects={subjects} />;
}

export default SubjectsPage;
