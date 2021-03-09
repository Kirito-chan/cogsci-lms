import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import {
  getStudentPresentationsClosed,
  getStudentPresentationsOpened,
  loadStudentPresentationsClosed,
  loadStudentPresentationsOpened,
} from "../home/homeSlice";
import {
  loadPresentation,
  getPresentation,
  getComments,
  loadComments,
} from "./presentationSlice";
import PresentationPageView from "./PresentationPageView";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import Loader from "react-loader-spinner";
import Navigation from "../../../components/Navigation";

function PresentationPage() {
  const dispatch = useDispatch();
  const { presentationId, subjectId } = useParams();
  const location = useLocation();
  const presIsOpened =
    new URLSearchParams(location.search).get("is_opened") == "true";

  const presentation = useSelector(getPresentation);
  const presentations = presIsOpened
    ? useSelector(getStudentPresentationsOpened)
    : useSelector(getStudentPresentationsClosed);
  const currentUserId = useSelector(getCurrentUserId);
  const comments = useSelector(getComments);

  useEffect(() => {
    if (presentationId) dispatch(loadComments(presentationId));
  }, [presentationId]);

  const [studPresentation, setStudPresentation] = useState(
    presentations.filter((studPres) => studPres.pres_id == presentationId)[0]
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
      setStudPresentation(presentations.filter((studPres) => studPres.pres_id == presentationId)[0]);
    }
  }, [presentations]);

  return (
    <div>
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
