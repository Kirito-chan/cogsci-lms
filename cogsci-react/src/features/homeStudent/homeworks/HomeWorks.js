import React, { useEffect } from "react";
import HomeWorksList from "./HomeWorksList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../app/currentUserSlice";
import { loadHomeworks, getHomeworks } from "../homeStudentSlice";

function HomeWorks() {
  const dispatch = useDispatch();

  const homeworks = useSelector(getHomeworks);
  const currentUserId = useSelector(getCurrentUser);

  useEffect(() => {
    dispatch(loadHomeworks(currentUserId));
  }, []);

  return <HomeWorksList homeworks={homeworks} />;
}

export default HomeWorks;
