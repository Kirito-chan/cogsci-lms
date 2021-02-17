import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import { getBonuses, loadBonuses } from "../home/homeSlice";
import BonusesPageList from "./BonusesPageList";

function BonusesPage() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const bonuses = useSelector(getBonuses);
  const currentUserId = useSelector(getCurrentUserId);

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadBonuses(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  return (
    <div>
      <BonusesPageList bonuses={bonuses} subjectId={subjectId} />
    </div>
  );
}

export default BonusesPage;
