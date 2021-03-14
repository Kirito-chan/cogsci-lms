import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import { showLoaderIfNull } from "../../../components/StringUtils";
import { getBonuses, loadBonuses } from "../home/homeSlice";
import BonusesPageList from "./BonusesPageList";

function BonusesPage() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const bonuses = useSelector(getBonuses);
  const currentUserId = useSelector(getCurrentUserId);

  useEffect(() => {
    document.title = "Bonusové úlohy";
  }, []);

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadBonuses(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  return (
    showLoaderIfNull(bonuses) || (
      <BonusesPageList bonuses={bonuses} subjectId={subjectId} />
    )
  );
}

export default BonusesPage;
