import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCurrentUserId, getIsAdmin } from "../../../app/currentUserSlice";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";
import { getBonuses, loadBonuses } from "../home/homeSlice";
import BonusesPageList from "./BonusesPageList";

function BonusesPage() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const bonuses = useSelector(getBonuses);
  const currentUserId = useSelector(getCurrentUserId);
  const isAdmin = useSelector(getIsAdmin);

  useEffect(() => {
    document.title = "Bonusové úlohy";
  }, []);

  useEffect(() => {
    if (currentUserId && subjectId) {
      dispatch(loadBonuses(currentUserId, subjectId));
    }
  }, [currentUserId, subjectId]);

  return (
    showLoaderIfAnyNull(bonuses) || (
      <BonusesPageList
        bonuses={bonuses}
        subjectId={subjectId}
        isAdmin={isAdmin}
        currentUserId={currentUserId}
      />
    )
  );
}

export default BonusesPage;
