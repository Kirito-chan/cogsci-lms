import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import { getBonuses, loadBonuses } from "../home/homeSlice";
import BonusPageView from "./BonusPageView";
import { loadBonus, getBonus, getComments, loadComments } from "./bonusSlice";
import { HashLink } from "react-router-hash-link";

function BonusPage() {
  const dispatch = useDispatch();
  const { bonusId, subjectId } = useParams();
  const location = useLocation();

  const bonus = useSelector(getBonus);
  const bonuses = useSelector(getBonuses);
  const currentUserId = useSelector(getCurrentUserId);
  const comments = useSelector(getComments);
  const [bonusOrderId, setBonusOrderId] = useState(
    bonuses.findIndex((x) => x.id === bonus.id)
  );
  const [bonusik, setBonusik] = useState(
    bonuses.filter((bonusik) => bonusik.id === bonus.id)[0]
  );

  useEffect(() => {
    document.title =
      "Bonusová úloha " +
      (bonusOrderId && bonusOrderId != -1 ? "č. " + bonusOrderId : "");
  }, [bonusOrderId]);

  useEffect(() => {
    if (bonusId) dispatch(loadComments(bonusId));
  }, [bonusId]);

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

  useEffect(() => {
    if (location.hash.includes("myNewComment")) {
      document.getElementById("scrollDown").click();
    }
  }, [comments]);

  return (
    <div>
      <HashLink
        smooth
        to={location.pathname + location.hash}
        id="scrollDown"
        className="d-none"
      ></HashLink>

      <BonusPageView
        bonus={bonusik}
        bonusOrderId={bonusOrderId}
        subjectId={subjectId}
        comments={comments}
        currentUserId={currentUserId}
      />
    </div>
  );
}

export default BonusPage;
