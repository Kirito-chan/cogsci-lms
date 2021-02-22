import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import { getBonuses, loadBonuses } from "../home/homeSlice";
import BonusPageView from "./BonusPageView";
import { loadBonus, getBonus } from "./bonusSlice";

function BonusPage() {
  const dispatch = useDispatch();
  const { bonusId, subjectId } = useParams();

  const bonus = useSelector(getBonus);
  const bonuses = useSelector(getBonuses);
  const currentUserId = useSelector(getCurrentUserId);

  const [bonusOrderId, setBonusOrderId] = useState(
    bonuses.findIndex((x) => x.id === bonus.id)
  );
  const [bonusik, setBonusik] = useState(
    bonuses.filter((bonusik) => bonusik.id === bonus.id)[0]
  );

  useEffect(() => {
    if (bonusId) dispatch(loadBonus(bonusId));
  }, [bonusId]);

  useEffect(() => {
    if (bonuses.length > 0) {
      setBonusOrderId(
        bonuses.length - bonuses.findIndex((x) => x.id === bonus.id)
      );
    }
  }, [bonuses, bonus]);

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadBonuses(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  useEffect(() => {
    if (bonuses.length > 0) {
      setBonusik(bonuses.filter((bonusik) => bonusik.id === bonus.id)[0]);
    }
  }, [bonuses, bonus]);

  return (
    <BonusPageView
      bonus={bonusik}
      bonusOrderId={bonusOrderId}
      subjectId={subjectId}
    />
  );
}

export default BonusPage;
