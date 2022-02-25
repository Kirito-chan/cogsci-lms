import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import LoadingInButton from "../../../components/LoadingInButton";
import {
  GOT_0_BONUS_POINTS,
  GOT_1_BONUS_POINTS,
  NOT_YET_EVALUATED_BONUS_POINTS,
} from "../../../constants";
import { loadComments, updateBonusValuated } from "./bonusSlice";
import "./CommentEval.css";

function CommentEval({ bonusId, comment }) {
  const { subjectId } = useParams();
  const dispatch = useDispatch();
  const [loadingZero, setLoadingZero] = useState(false); // loading for zero points button
  const [loadingOne, setLoadingOne] = useState(false);
  // prettier-ignore
  const [zeroPointsActive, setZeroPointsActive] = useState(comment.valuated == GOT_0_BONUS_POINTS);
  // prettier-ignore
  const [onePointActive, setOnePointActive] = useState(comment.valuated == GOT_1_BONUS_POINTS);
  const [notEvaluatedDisplayed, setNotEvaluatedDisplayed] = useState(
    comment.valuated == GOT_0_BONUS_POINTS ||
      comment.valuated == GOT_1_BONUS_POINTS
      ? "d-none"
      : "d-inline-block"
  );
  const buttonClickedInTwoBtnGroup = (
    sameButtonActive,
    setSameButtonActive,
    otherButtonActive,
    setOtherButtonActive,
    setTextDisplayed,
    valuated,
    setLoading
  ) => {
    if (otherButtonActive) {
      setOtherButtonActive(false);
    }
    setLoading(true);
    if (sameButtonActive) {
      dispatch(
        updateBonusValuated(bonusId, comment.id, NOT_YET_EVALUATED_BONUS_POINTS)
      ).then(() => {
        setLoading(false);
        setSameButtonActive(false);
        setTextDisplayed("d-inline-block");
        if (bonusId && subjectId) dispatch(loadComments(bonusId, subjectId));
      });
    } else {
      dispatch(updateBonusValuated(bonusId, comment.id, valuated)).then(() => {
        setLoading(false);
        setSameButtonActive(true);
        setTextDisplayed("d-none");
        if (bonusId && subjectId) dispatch(loadComments(bonusId, subjectId));
      });
    }
  };
  const zeroPointsClicked = () => {
    dispatch(updateBonusValuated(bonusId, comment.id, GOT_0_BONUS_POINTS));
    buttonClickedInTwoBtnGroup(
      zeroPointsActive,
      setZeroPointsActive,
      onePointActive,
      setOnePointActive,
      setNotEvaluatedDisplayed,
      GOT_0_BONUS_POINTS,
      setLoadingZero
    );
  };
  const onePointClicked = () => {
    buttonClickedInTwoBtnGroup(
      onePointActive,
      setOnePointActive,
      zeroPointsActive,
      setZeroPointsActive,
      setNotEvaluatedDisplayed,
      GOT_1_BONUS_POINTS,
      setLoadingOne
    );
  };
  return (
    <React.Fragment>
      <div className="d-inline-block">
        <span className={"mx-2 " + notEvaluatedDisplayed}>nehodnotené</span>
        <Button
          variant={zeroPointsActive ? "success" : "outline-success"}
          size="sm"
          onClick={zeroPointsClicked}
          active={false}
          className={"left-btn " + (notEvaluatedDisplayed ? "ml-2" : "")}
          style={{ boxShadow: "none" }}
        >
          {loadingZero ? <LoadingInButton /> : "0 bodov"}
        </Button>
        <Button
          variant={onePointActive ? "success" : "outline-success"}
          size="sm"
          onClick={onePointClicked}
          className="right-btn"
          style={{ boxShadow: "none" }}
        >
          {loadingOne ? <LoadingInButton /> : "1 bod"}
        </Button>
      </div>
    </React.Fragment>
  );
}

export default CommentEval;
