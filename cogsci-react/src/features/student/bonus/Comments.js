import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, loadComments } from "./bonusSlice";
import CommentsList from "./CommentsList";

function Comments({ bonusId }) {
  const dispatch = useDispatch();

  const comments = useSelector(getComments);

  useEffect(() => {
    if (bonusId) dispatch(loadComments(bonusId));
  }, [bonusId]);
  return <CommentsList bonusId={bonusId} comments={comments} />;
}

export default Comments;
