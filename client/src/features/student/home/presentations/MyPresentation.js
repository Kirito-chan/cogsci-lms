import React, { useEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadMyPresentation(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  return (
    <div className="mt-5 mb-5">
      <h3>Moja prezentácia</h3>
      {showLoaderIfAnyNull(myPresentation) || (
        <MyPresentationList
          myPresentation={myPresentation}
          presentationWeight={presentationWeight}
          subjectId={subjectId}
          currentUserId={currentUserId}
          handleUpload={handleUpload}
          fileInputRef={fileInputRef}
          loading={loading}
        />
      )}
    </div>
  );
}

export default MyPresentation;
