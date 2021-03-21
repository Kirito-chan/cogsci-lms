import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import {
  // getMyPresentation,
  // getStudentPresentationsClosed,
  // getStudentPresentationsOpened,
  // getTeacherPresentations,
  loadMyPresentation,
  loadStudentPresentationsClosed,
  loadStudentPresentationsOpened,
  // loadTeacherPresentations,
} from "../home/homeSlice";
import {
  // loadPresentation,
  getPresentation,
  getComments,
  loadComments,
  getValuationTypes,
} from "./presentationSlice";
import PresentationPageView from "./PresentationPageView";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import { HashLink } from "react-router-hash-link";

function PresentationPage() {
  const dispatch = useDispatch();
  const { presentationId, subjectId } = useParams();
  const location = useLocation();
  // prettier-ignore
  const presIsOpened =  new URLSearchParams(location.search).get("is_opened") == "true";
  // prettier-ignore
  const isTeacherPres = new URLSearchParams(location.search).get("teacher") == "true";
  const isMyPres = new URLSearchParams(location.search).get("is_my") == "true";

  const presentation = useSelector((state) =>
    getPresentation(
      state,
      presentationId,
      presIsOpened,
      isTeacherPres,
      isMyPres
    )
  );

  const currentUserId = useSelector(getCurrentUserId);
  const comments = useSelector(getComments);
  const valuationTypes = useSelector(getValuationTypes);

  useEffect(() => {
    document.title =
      "Prezentácia · " +
      (presentation != null && presentation.title ? presentation.title : "");
  }, [presentation]);

  useEffect(() => {
    if (presentationId) {
      dispatch(loadComments(presentationId));
      dispatch(loadComments(presentationId));
    }
  }, [presentationId]);

  useEffect(() => {
    dispatch(loadStudentPresentationsOpened(currentUserId, subjectId));
    dispatch(loadStudentPresentationsClosed(currentUserId, subjectId));
    dispatch(loadMyPresentation(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

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

  const scrollWidthOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = 96;
    window.scrollTo({ top: yCoordinate - yOffset, behavior: "smooth" });
  };

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
        scroll={(el) => scrollWidthOffset(el)}
        className="d-none"
      ></HashLink>

      <PresentationPageView
        presentation={presentation}
        comments={comments}
        currentUserId={currentUserId}
        subjectId={subjectId}
        presIsOpened={presIsOpened}
        isTeacherPres={isTeacherPres}
      />
    </div>
  );
}
export default PresentationPage;
