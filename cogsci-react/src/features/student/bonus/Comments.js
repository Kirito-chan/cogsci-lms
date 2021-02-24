import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserName } from "../../../app/currentUserSlice";
import { getComments, loadComments } from "./bonusSlice";
import CommentsList from "./CommentsList";

function Comments({ bonusId }) {
  const dispatch = useDispatch();

  const comments = useSelector(getComments);
  const currentUserName = useSelector(getCurrentUserName);

  useEffect(() => {
    if (bonusId) dispatch(loadComments(bonusId));
  }, [bonusId]);
  return (
    <CommentsList
      bonusId={bonusId}
      comments={comments}
      currentUserName={currentUserName}
    />
  );
}

export default Comments;
