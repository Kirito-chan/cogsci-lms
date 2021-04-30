import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import {
  loadMyPresentation,
  loadStudentPresentationsClosed,
  loadStudentPresentationsOpened,
  loadTeacherPresentations,
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
import { getCurrentUserId, getIsAdmin } from "../../../app/currentUserSlice";
import { HashLink } from "react-router-hash-link";
import {
  cursorFocus,
  scrollWithOffset,
} from "./../../../components/ScrollUtils";
import createOrderedCommentsMap from "./../../../components/ArrayUtils";
import { loadStudentPresentationsNeutral } from "../../admin/home/homeSlice";
import {
  loadMyPresentation as loadMyPresentationAdmin,
  getMyPresentation as getMyPresentationAdmin,
  getPresentationWeight,
  loadSubjectWeight,
} from "../../admin/student-detail/studentDetailSlice";

function PresentationPage() {
  const dispatch = useDispatch();
  const { presentationId, subjectId } = useParams();
  const location = useLocation();
  const history = useHistory();
  // prettier-ignore
  const [presIsOpened] = useState(new URLSearchParams(location.search).get("is_opened") == "true");
  // prettier-ignore
  const [presIsNeutral] = useState(new URLSearchParams(location.search).get("is_opened") == "neutral");
  // prettier-ignore
  const [isTeacherPres] = useState(new URLSearchParams(location.search).get("teacher") == "true");
  const [isMyPres] = useState(
    new URLSearchParams(location.search).get("is_my") == "true"
  );
  const isAdmin = useSelector(getIsAdmin);
  const presentationPoints = useSelector(getMyPresentationAdmin);
  const presentationWeight = useSelector(getPresentationWeight);

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
      presIsNeutral,
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
    if (presentationId && subjectId) {
      if (isTeacherPres)
        dispatch(loadTeacherComments(presentationId, subjectId));
      else dispatch(loadStudentComments(presentationId, subjectId));
    }
  }, [presentationId, subjectId]);

  useEffect(() => {
    if (currentUserId && subjectId) {
      dispatch(loadStudentPresentationsNeutral(currentUserId, subjectId));
      dispatch(loadStudentPresentationsOpened(currentUserId, subjectId));
      dispatch(loadStudentPresentationsClosed(currentUserId, subjectId));
      dispatch(loadTeacherPresentations(currentUserId, subjectId));
      dispatch(loadMyPresentation(currentUserId, subjectId));
    }
  }, [currentUserId, subjectId]);

  useEffect(() => {
    if (presentation && presentation.user_id && isAdmin) {
      dispatch(loadMyPresentationAdmin(presentation.user_id, subjectId));
      dispatch(loadSubjectWeight(subjectId));
    }
  }, [presentation, isAdmin]);

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
      document.getElementById("scrollDownToLastComment").click();
    }
  }, [comments]);

  useEffect(() => {
    if (location.hash.includes("sliderForm")) {
      document.getElementById("scrollDownToSlider").click();
    }
  }, [valuationTypes]);
  console.log(presentationWeight);

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
        isAdmin={isAdmin}
        history={history}
        presentationPoints={presentationPoints}
        presentationWeight={presentationWeight}
      />
    </div>
  );
}
export default PresentationPage;
