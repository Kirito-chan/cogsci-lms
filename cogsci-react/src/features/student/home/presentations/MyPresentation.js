import React, { useEffect } from "react";
import MyPresentationList from "./MyPresentationList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import { loadMyPresentation, getMyPresentation } from "../homeSlice";
import { useParams } from "react-router";

function MyPresentation() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const myPresentations = useSelector(getMyPresentation);
  const { subjectId } = useParams();

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadMyPresentation(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  return (
    <MyPresentationList
      myPresentations={myPresentations.presentations}
      presentationWeight={myPresentations.presentationWeight}
    />
  );
}

export default MyPresentation;
