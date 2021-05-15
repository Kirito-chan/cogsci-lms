import React, { useEffect, useRef } from "react";
import MyPresentationList from "./MyPresentationList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import {
  loadMyPresentation,
  getMyPresentation,
  uploadPresentation,
  loadStudentPresentationsOpened,
  getPresentationWeight,
} from "../homeSlice";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/utils/StringUtils";

function MyPresentation() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const myPresentation = useSelector(getMyPresentation);
  const presentationWeight = useSelector(getPresentationWeight);
  const { subjectId } = useParams();
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    dispatch(
      uploadPresentation(
        file,
        subjectId,
        currentUserId,
        false,
        myPresentation.status
      )
    ).then((res) => {
      if (res) {
        const userId = res.payload.userId;
        const subjectId = res.payload.subjectId;
        dispatch(loadMyPresentation(userId, subjectId));
        dispatch(loadStudentPresentationsOpened(userId, subjectId));
      }
    });
  };

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadMyPresentation(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  return (
    showLoaderIfAnyNull(myPresentation) || (
      <MyPresentationList
        myPresentation={myPresentation}
        presentationWeight={presentationWeight}
        subjectId={subjectId}
        currentUserId={currentUserId}
        handleUpload={handleUpload}
        fileInputRef={fileInputRef}
        classname="mt-5 mb-5"
      />
    )
  );
}

export default MyPresentation;
