import React, { useEffect } from "react";
import MyPresentationList from "./MyPresentationList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../app/currentUserSlice";
import { loadMyPresentation, getMyPresentation } from "../homeStudentSlice";

function MyPresentation() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUser);
  const myPresentation = useSelector(getMyPresentation);

  useEffect(() => {
    dispatch(loadMyPresentation(currentUserId));
  }, []);

  return <MyPresentationList myPresentation={myPresentation} />;
}

export default MyPresentation;
