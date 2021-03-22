import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import {
  loadMyPresentation,
  loadStudentPresentationsClosed,
  loadStudentPresentationsOpened,
} from "../home/homeSlice";
import {
  getPresentation,
  getComments,
  getValuationTypes,
  loadTeacherComments,
  loadStudentComments,
  insertTeacherComment,
  insertStudentComment,
} from "./presentationSlice";
import PresentationPageView from "./PresentationPageView";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import { HashLink } from "react-router-hash-link";
import { scrollWithOffset } from "./../../../components/ScrollUtils";
import createOrderedCommentsMap from "./../../../components/ArrayUtils";

function PresentationPage() {
  const dispatch = useDispatch();
  const { presentationId, subjectId } = useParams();
  const location = useLocation();
  // prettier-ignore
  const presIsOpened =  new URLSearchParams(location.search).get("is_opened") == "true";
  // prettier-ignore
  const isTeacherPres = new URLSearchParams(location.search).get("teacher") == "true";
  const isMyPres = new URLSearchParams(location.search).get("is_my") == "true";

  const currentUserId = useSelector(getCurrentUserId);
  const comments = useSelector(getComments);
  const valuationTypes = useSelector(getValuationTypes);
  const [commentsMap, setCommentsMap] = useState(new Map());
  const [scrollElementIndex, setScrollElementIndex] = useState(null); // index elementu, ku ktoremu sa ma preskollovat obrazovka (tym elementom je Novy komentar ktorym reaguje nan ejaky komentar)
  const [commentsLength, setCommentsLength] = useState(comments?.length);
  const [refToScrolledElement, setRefToScrolledElement] = useState([]);

  const presentation = useSelector((state) =>
    getPresentation(
      state,
      presentationId,
      presIsOpened,
      isTeacherPres,
      isMyPres
    )
  );

  useEffect(() => {
    document.title =
      "Prezentácia · " +
      (presentation != null && presentation.title ? presentation.title : "");
  }, [presentation]);

  useEffect(() => {
    if (presentationId) {
      if (isTeacherPres) dispatch(loadTeacherComments(presentationId));
      else dispatch(loadStudentComments(presentationId));
    }
  }, [presentationId]);

  useEffect(() => {
    dispatch(loadStudentPresentationsOpened(currentUserId, subjectId));
    dispatch(loadStudentPresentationsClosed(currentUserId, subjectId));
    dispatch(loadMyPresentation(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

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
      scrollWithOffset(refToScrolledElement[scrollElementIndex].current);
      refToScrolledElement[scrollElementIndex].current.focus();
      setScrollElementIndex(null);
    }
  }, [scrollElementIndex, refToScrolledElement, comments]);

  useEffect(() => {
    if (location.hash.includes("myNewComment")) {
      document.getElementById("scrollDownToLastComment").click();
    }
  }, [comments]);

  useEffect(() => {
    if (location.hash.includes("sliderForm")) {
      document.getElementById("scrollDownToSlider").click();
    }
  }, [valuationTypes]);

  return (
    <div>
      <HashLink
        smooth
        to={location.pathname + location.search + location.hash}
        id="scrollDownToLastComment"
        className="d-none"
      ></HashLink>
      <HashLink
        smooth
        to={location.pathname + location.search + location.hash}
        id="scrollDownToSlider"
        scroll={(el) => scrollWithOffset(el)}
        className="d-none"
      ></HashLink>

      <PresentationPageView
        presentation={presentation}
        comments={comments}
        currentUserId={currentUserId}
        subjectId={subjectId}
        presIsOpened={presIsOpened}
        isTeacherPres={isTeacherPres}
        insertComment={
          isTeacherPres ? insertTeacherComment : insertStudentComment
        }
        loadComments={isTeacherPres ? loadTeacherComments : loadStudentComments}
        commentsMap={commentsMap}
        refToScrolledElement={refToScrolledElement}
        setScrollElementIndex={setScrollElementIndex}
      />
    </div>
  );
}
export default PresentationPage;
