import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import {
  NOT_VALUATED_BONUS_POINT,
  ONE_BONUS_POINT,
  ZERO_BONUS_POINTS,
} from "../../../constants";
import { updateBonusValuated } from "./bonusSlice";

function CommentEval({ bonusId, comment }) {
  const dispatch = useDispatch();
  const [loadingZero, setLoadingZero] = useState(false); // loading for zero points button
  const [loadingOne, setLoadingOne] = useState(false);
  // prettier-ignore
  const [zeroPointsActive, setZeroPointsActive] = useState(comment.valuated == ZERO_BONUS_POINTS);
  // prettier-ignore
  const [onePointActive, setOnePointActive] = useState(comment.valuated == ONE_BONUS_POINT);
  const [notEvaluatedDisplayed, setNotEvaluatedDisplayed] = useState(
    comment.valuated == ZERO_BONUS_POINTS || comment.valuated == ONE_BONUS_POINT
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
        updateBonusValuated(bonusId, comment.id, NOT_VALUATED_BONUS_POINT)
      ).then(() => {
        setLoading(false);
        setSameButtonActive(false);
        setTextDisplayed("d-inline-block");
      });
    } else {
      dispatch(updateBonusValuated(bonusId, comment.id, valuated)).then(() => {
        setLoading(false);
        setSameButtonActive(true);
        setTextDisplayed("d-none");
      });
    }
  };
  const zeroPointsClicked = () => {
    dispatch(updateBonusValuated(bonusId, comment.id, ZERO_BONUS_POINTS));
    buttonClickedInTwoBtnGroup(
      zeroPointsActive,
      setZeroPointsActive,
      onePointActive,
      setOnePointActive,
      setNotEvaluatedDisplayed,
      ZERO_BONUS_POINTS,
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
      ONE_BONUS_POINT,
      setLoadingOne
    );
  };
  return (
    <React.Fragment>
      <span className={"mx-2 " + notEvaluatedDisplayed}>nehodnotené</span>

      <Button
        variant={zeroPointsActive ? "warning" : "outline-warning"}
        size="sm"
        onClick={zeroPointsClicked}
        active={false}
        className="mybtn"
        style={{ boxShadow: "none" }}
      >
        {loadingZero ? (
          <span>
            <span className={"spinner-border spinner-border-sm "}></span>{" "}
            Loading...
          </span>
        ) : (
          "0 bodov"
        )}
      </Button>
      <Button
        variant={onePointActive ? "success" : "outline-success"}
        size="sm"
        className="mx-2 mybtn"
        onClick={onePointClicked}
        style={{ boxShadow: "none" }}
      >
        {loadingOne ? (
          <span>
            <span className={"spinner-border spinner-border-sm "}></span>{" "}
            Loading...
          </span>
        ) : (
          "1 bod"
        )}
      </Button>
      <Button variant="outline-danger" size="sm">
        Odstrániť
      </Button>
    </React.Fragment>
  );
}

export default CommentEval;
