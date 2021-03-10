import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSubjectValuation, loadSubjectValuation } from "../home/homeSlice";
import TermsPageView from "./TermsPageView";

function TermsPage() {
  const dispatch = useDispatch();
  const subjectValuation = useSelector(getSubjectValuation);
  const { subjectId } = useParams();

  useEffect(() => {
    if (subjectId) {
      dispatch(loadSubjectValuation(subjectId));
    }
  }, [subjectId]);

  return (
    <div>
      <TermsPageView subjectValuation={subjectValuation} />
    </div>
  );
}

export default TermsPage;
