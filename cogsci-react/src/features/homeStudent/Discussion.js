import React from "react";
import Button from "react-bootstrap/Button";
import formatTranslation from "../../components/StringUtils";
import HomeWorkEvaluation from "./homeworks/HomeWorkEvaluation";

function Discussion({ data, classAttribute, evaluation }) {
  const num_of_all_comments = data.num_all_comments;
  const num_of_my_comments = data.num_of_comments;
  return (
    <div className={classAttribute}>
      <p className={classAttribute}>
        {num_of_all_comments || 0}{" "}
        {formatTranslation(num_of_all_comments, "príspevok")},{" "}
        {num_of_my_comments} {formatTranslation(num_of_my_comments, "váš")}
        {!evaluation || (
          <span>
            , <HomeWorkEvaluation evaluation={evaluation} />
          </span>
        )}
      </p>

      <Button variant="success" size="sm">
        Diskutovať
      </Button>
    </div>
  );
}

export default Discussion;
