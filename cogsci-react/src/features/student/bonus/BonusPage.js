import React, { createRef, useEffect, /* useRef,*/ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { getCurrentUserId, getIsAdmin } from "../../../app/currentUserSlice";
import BonusPageView from "./BonusPageView";
import { getBonus, getComments, loadBonus, loadComments } from "./bonusSlice";
import { HashLink } from "react-router-hash-link";
import createOrderedCommentsMap from "./../../../components/ArrayUtils";
import {
  cursorFocus,
  scrollWithOffset,
} from "./../../../components/ScrollUtils";

function BonusPage() {
  const dispatch = useDispatch();
  const { bonusId, subjectId } = useParams();
  const location = useLocation();

  const bonus = useSelector((state) => getBonus(state, bonusId));
  const currentUserId = useSelector(getCurrentUserId);
  const comments = useSelector(getComments);
  const isAdmin = useSelector(getIsAdmin);
  const [commentsMap, setCommentsMap] = useState(new Map());
  const [scrollElementIndex, setScrollElementIndex] = useState(null); // index elementu, ku ktoremu sa ma preskollovat obrazovka (tym elementom je Novy komentar ktorym reaguje nan ejaky komentar)
  const [commentsLength, setCommentsLength] = useState(comments?.length);
  const [refToScrolledElement, setRefToScrolledElement] = useState([]);

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
    if (comments) {
      setCommentsLength(comments.length);
      setCommentsMap(createOrderedCommentsMap(comments));
    }
  }, [comments]);

  useEffect(() => {
    if (commentsLength > 0) {
      setRefToScrolledElement((refToScrolledElement) =>
        Array(commentsLength)
          .fill()
          .map((_, i) => refToScrolledElement[i] || createRef())
      );
    }
  }, [commentsLength]);

  useEffect(() => {
    if (scrollElementIndex && refToScrolledElement.length > 0) {
      cursorFocus(refToScrolledElement[scrollElementIndex].current);
      scrollWithOffset(refToScrolledElement[scrollElementIndex].current);
      setScrollElementIndex(null);
    }
  }, [scrollElementIndex, refToScrolledElement, comments]);

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
        commentsMap={commentsMap}
        refToScrolledElement={refToScrolledElement}
        setScrollElementIndex={setScrollElementIndex}
      />
    </div>
  );
}

export default BonusPage;
