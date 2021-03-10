import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import {
  getStudentPresentationsClosed,
  getStudentPresentationsOpened,
  getTeacherPresentations,
  loadStudentPresentationsClosed,
  loadStudentPresentationsOpened,
} from "../home/homeSlice";
import {
  loadPresentation,
  getPresentation,
  getComments,
  loadComments,
  getValuationTypes,
} from "./presentationSlice";
import PresentationPageView from "./PresentationPageView";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import Loader from "react-loader-spinner";
import Navigation from "../../../components/Navigation";
import { HashLink } from "react-router-hash-link";

function PresentationPage() {
  const dispatch = useDispatch();
  const { presentationId, subjectId } = useParams();
  const location = useLocation();
  const presIsOpened =
    new URLSearchParams(location.search).get("is_opened") == "true";
  const isTeacherPres =
    new URLSearchParams(location.search).get("teacher") == "true";

  const presentation = useSelector(getPresentation);
  let presentations = null;
  if (presIsOpened) {
    presentations = useSelector(getStudentPresentationsOpened);
  } else {
    if (!isTeacherPres) {
      presentations = useSelector(getStudentPresentationsClosed);
    } else presentations = useSelector(getTeacherPresentations);
  }
  const currentUserId = useSelector(getCurrentUserId);
  const comments = useSelector(getComments);
  const valuationTypes = useSelector(getValuationTypes);

  useEffect(() => {
    if (presentationId) dispatch(loadComments(presentationId));
  }, [presentationId]);

  const [studPresentation, setStudPresentation] = useState(
    presentations.filter((studPres) => studPres.id == presentationId)[0]
  );

  useEffect(() => {
    if (studPresentation) dispatch(loadPresentation(studPresentation));
  }, [studPresentation]);

  useEffect(() => {
    if (currentUserId && subjectId) {
      if (presIsOpened) {
        dispatch(loadStudentPresentationsOpened(currentUserId, subjectId));
      } else dispatch(loadStudentPresentationsClosed(currentUserId, subjectId));
    }
  }, [currentUserId, subjectId]);

  useEffect(() => {
    if (presentations.length > 0) {
      // prettier-ignore
      setStudPresentation(presentations.filter((studPres) => studPres.id == presentationId)[0]);
    }
  }, [presentations]);

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

      {Object.entries(presentation).length ? (
        <PresentationPageView
          presentation={presentation}
          comments={comments}
          currentUserId={currentUserId}
          subjectId={subjectId}
          presIsOpened={presIsOpened}
        />
      ) : (
        <div>
          <Navigation />
          <div className="d-flex justify-content-center">
            <Loader type="Oval" color="#00BFFF" height={100} width={100} />
          </div>
        </div>
      )}
    </div>
  );
}
export default PresentationPage;
