import React, { useEffect } from "react";
import BonusesList from "./BonusesList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import { loadBonuses, getBonuses } from "../homeSlice";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/StringUtils";

function Bonuses() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const bonuses = useSelector(getBonuses);
  const currentUserId = useSelector(getCurrentUserId);

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadBonuses(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  return (
    showLoaderIfAnyNull(bonuses) || (
      <BonusesList bonuses={bonuses} subjectId={subjectId} />
    )
  );
}

export default Bonuses;
