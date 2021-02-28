import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getStudentPresentations,
  loadStudentPresentations,
} from "../home/homeSlice";
import { loadPresentation, getPresentation } from "./presentationSlice";
import PresentationPageView from "./PresentationPageView";
import { getCurrentUserId } from "../../../app/currentUserSlice";

function PresentationPage() {
  const dispatch = useDispatch();
  const { presentationId, subjectId } = useParams();

  const presentation = useSelector(getPresentation);
  const presentations = useSelector(getStudentPresentations);
  const currentUserId = useSelector(getCurrentUserId);

  const [studPresentation, setStudPresentation] = useState(
    presentations.filter((studPres) => studPres.pres_id == presentationId)[0]
  );

  useEffect(() => {
    if (studPresentation) dispatch(loadPresentation(studPresentation));
  }, [studPresentation]);

  useEffect(() => {
    if (currentUserId && subjectId)
      dispatch(loadStudentPresentations(currentUserId, subjectId));
  }, [currentUserId, subjectId]);

  useEffect(() => {
    if (presentations.length > 0) {
      // prettier-ignore
      setStudPresentation(presentations.filter((studPres) => studPres.pres_id == presentationId)[0]);
    }
  }, [presentations, presentation]);

  return <PresentationPageView presentation={studPresentation} />;
}

export default PresentationPage;
