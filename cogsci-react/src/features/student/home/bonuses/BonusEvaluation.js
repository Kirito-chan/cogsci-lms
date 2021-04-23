import React from "react";
import formatTranslation from "../../../../components/StringUtils";
import {
  GOT_0_BONUS_POINTS,
  GOT_1_BONUS_POINTS,
  NOT_YET_COMMENTED,
  NOT_YET_EVALUATED_BONUS_POINTS,
} from "../../../../constants";

function BonusEvaluation({ evaluation }) {
  let textClassAttribute = "";
  let text = "získal " + evaluation;

  if (evaluation == GOT_0_BONUS_POINTS) {
    textClassAttribute = "text-danger font-weight-bold";
    text = text.concat(" " + formatTranslation(0, "bod"));
  } else if (evaluation == GOT_1_BONUS_POINTS) {
    textClassAttribute = "text-success font-weight-bold";
    text = text.concat(" " + formatTranslation(1, "bod"));
  } else if (evaluation == NOT_YET_EVALUATED_BONUS_POINTS) {
    textClassAttribute = "text-secondary";
    text = "nehodnotené";
  } else if (evaluation == NOT_YET_COMMENTED) {
    textClassAttribute = "text-secondary";
    text = "nekomentovali ste";
  }

  return <span className={textClassAttribute}>{text}</span>;
}

export default BonusEvaluation;
