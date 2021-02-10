import React, { useEffect } from "react";
import SubjectsPageList from "./SubjectsPageList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import { loadSubjects, getSubjects } from "./subjectsSlice";

function SubjectsPage() {
  const dispatch = useDispatch();

  const subjects = useSelector(getSubjects);
  const currentUserId = useSelector(getCurrentUserId);

  useEffect(() => {
    if (currentUserId) dispatch(loadSubjects(currentUserId));
  }, [currentUserId]);

  return <SubjectsPageList subjects={subjects} />;
}

export default SubjectsPage;
