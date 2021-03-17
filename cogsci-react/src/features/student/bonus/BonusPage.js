import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { getCurrentUserId, getIsAdmin } from "../../../app/currentUserSlice";
import BonusPageView from "./BonusPageView";
import { getBonus, getComments, loadBonus, loadComments } from "./bonusSlice";
import { HashLink } from "react-router-hash-link";

function BonusPage() {
  const dispatch = useDispatch();
  const { bonusId, subjectId } = useParams();
  const location = useLocation();

  const bonus = useSelector((state) => getBonus(state, bonusId));
  const currentUserId = useSelector(getCurrentUserId);
  const comments = useSelector(getComments);
  const isAdmin = useSelector(getIsAdmin);

  useEffect(() => {
    if (bonus && bonus.orderNumber != -1) {
      document.title = "Bonusová úloha č. " + bonus.orderNumber;
    }
  }, [bonus]);

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadBonus(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  useEffect(() => {
    if (bonusId) dispatch(loadComments(bonusId));
  }, [bonusId]);

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
        bonus={bonus}
        bonusOrderId={bonus.bonusOrderId}
        subjectId={subjectId}
        comments={comments}
        currentUserId={currentUserId}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default BonusPage;
