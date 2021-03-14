import React, { useEffect } from "react";
import MyPresentationList from "./MyPresentationList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import { loadMyPresentation, getMyPresentation } from "../homeSlice";
import { useParams } from "react-router";
import { showLoaderIfNull } from "../../../../components/StringUtils";

function MyPresentation() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const myPresentation = useSelector(getMyPresentation);
  const { subjectId } = useParams();

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadMyPresentation(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  return (
    showLoaderIfNull(myPresentation) || (
      <MyPresentationList
        myPresentation={myPresentation.presentation}
        presentationWeight={myPresentation.presentationWeight}
        subjectId={subjectId}
        currentUserId={currentUserId}
      />
    )
  );
}

export default MyPresentation;
