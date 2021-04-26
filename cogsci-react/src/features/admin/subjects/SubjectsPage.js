import React, { useEffect } from "react";
import SubjectsPageList from "./SubjectsPageList";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSubjects,
  getSubjects,
  clearCurrentSubject,
  getCurrentSubjectId,
} from "./subjectsSlice";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";
import { studentDetailCleared } from "../../../app/apiConstants";

function SubjectsPage() {
  const dispatch = useDispatch();
  const subjects = useSelector(getSubjects);
  const currentSubjectId = useSelector(getCurrentSubjectId);

  useEffect(() => {
    document.title = "Predmety · Kognitívne vedy";
    dispatch(loadSubjects());
    dispatch(studentDetailCleared());
  }, []);

  useEffect(() => {
    if (clearCurrentSubject) dispatch(clearCurrentSubject);
  }, [currentSubjectId]);

  return (
    showLoaderIfAnyNull(subjects) || <SubjectsPageList subjects={subjects} />
  );
}

export default SubjectsPage;
