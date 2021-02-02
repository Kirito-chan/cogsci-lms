import React from "react";

function HomeWorkEvaluation({ evaluation, classAttribute }) {
  let textClassAttribute = "";
  let text = evaluation;

  if (evaluation == 0) {
    textClassAttribute = "text-danger font-weight-bold";
    text = text.concat(" bodov");
  } else if (evaluation == 1) {
    textClassAttribute = "text-success font-weight-bold";
    text = text.concat(" bod");
  } else {
    textClassAttribute = "text-secondary font-italic";
  }

  return (
    <p className={classAttribute}>
      <b>Hodnotenie:</b> <span className={textClassAttribute}>{text}</span>
    </p>
  );
}

export default HomeWorkEvaluation;
