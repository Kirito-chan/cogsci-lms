import React from "react";
import formatTranslation from "../../../components/StringUtils";

function HomeWorkEvaluation({ evaluation }) {
  let textClassAttribute = "";
  let text = evaluation;

  if (evaluation == 0) {
    textClassAttribute = "text-danger font-weight-bold";
    text = "získal " + text;
    text = text.concat(" " + formatTranslation(0, "bod"));
  } else if (evaluation == 1) {
    textClassAttribute = "text-success font-weight-bold";
    text = "získal " + text;
    text = text.concat(" " + formatTranslation(1, "bod"));
  } else {
    textClassAttribute = "text-secondary";
  }

  return <span className={textClassAttribute}>{text}</span>;
}

export default HomeWorkEvaluation;
