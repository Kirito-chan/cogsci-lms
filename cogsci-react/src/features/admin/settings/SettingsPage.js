import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Navigation from "../../../components/Navigation";
import { SUBJ_IS_ACTIVE, SUBJ_IS_NOT_ACTIVE } from "../../../constants";
import {
  getCurrentSubjectStatus,
  loadSubject,
  updateSubjectStatus,
} from "../subjects/subjectsSlice";
import SettingsPageView from "./SettingsPageView";

function SettingsPage() {
  const subjectStatus = useSelector(getCurrentSubjectStatus);
  const { subjectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (subjectId) dispatch(loadSubject(subjectId));
  }, [subjectId]);

  useEffect(() => {
    document.title = "Nastavenia";
  }, []);

  const changeSubjectStatus = () => {
    if (subjectStatus !== null && subjectStatus !== undefined) {
      if (subjectStatus === SUBJ_IS_ACTIVE) {
        dispatch(updateSubjectStatus(subjectId, SUBJ_IS_NOT_ACTIVE)).then(
          () => {
            dispatch(loadSubject(subjectId));
          }
        );
      } else {
        dispatch(updateSubjectStatus(subjectId, SUBJ_IS_ACTIVE)).then(() => {
          dispatch(loadSubject(subjectId));
        });
      }
    }
  };

  return (
    <div>
      <Navigation />
      <SettingsPageView
        subjectStatus={subjectStatus}
        changeSubjectStatus={changeSubjectStatus}
      />
    </div>
  );
}

export default SettingsPage;
