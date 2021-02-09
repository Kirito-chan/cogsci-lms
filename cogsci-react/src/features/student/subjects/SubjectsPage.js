import React, { useEffect } from "react";
import SubjectsPageList from "./SubjectsPageList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import { loadSubjects, getSubjects } from "../subjects/subjectsSlice";

function SubjectsPage() {
  const dispatch = useDispatch();

  const subjects = useSelector(getSubjects);
  const currentUserId = useSelector(getCurrentUserId);

  useEffect(() => {
    dispatch(loadSubjects(currentUserId));
  }, [currentUserId]);

  return <SubjectsPageList subjects={subjects} />;
}

export default SubjectsPage;
