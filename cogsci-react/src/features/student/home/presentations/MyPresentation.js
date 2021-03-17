import React, { useEffect, useRef } from "react";
import MyPresentationList from "./MyPresentationList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import {
  loadMyPresentation,
  getMyPresentation,
  uploadPresentation,
  loadStudentPresentationsOpened,
} from "../homeSlice";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/StringUtils";

function MyPresentation() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const myPresentation = useSelector(getMyPresentation);
  const { subjectId } = useParams();
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    dispatch(uploadPresentation(file, subjectId, currentUserId)).then((res) => {
      const userId = res.payload.userId;
      const subjectId = res.payload.subjectId;
      dispatch(loadMyPresentation(userId, subjectId));
      dispatch(loadStudentPresentationsOpened(userId, subjectId));
    });
  };

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadMyPresentation(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  return (
    showLoaderIfAnyNull(myPresentation) || (
      <MyPresentationList
        myPresentation={myPresentation.presentation}
        presentationWeight={myPresentation.presentationWeight}
        subjectId={subjectId}
        currentUserId={currentUserId}
        handleUpload={handleUpload}
        fileInputRef={fileInputRef}
      />
    )
  );
}

export default MyPresentation;
