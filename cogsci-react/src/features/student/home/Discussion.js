import React from "react";
import formatTranslation from "../../../components/StringUtils";
import BonusEvaluation from "./bonuses/BonusEvaluation";
import { HashLink } from "react-router-hash-link";
import { useSelector } from "react-redux";
import { getIsAdmin } from "../../../app/currentUserSlice";

function Discussion({
  data,
  classAttribute,
  evaluation,
  redirectTo,
  hash,
  queryString,
}) {
  const isAdmin = useSelector(getIsAdmin);
  const num_of_all_comments = data?.num_all_comments;
  const num_of_my_comments = data?.num_of_comments;

  return (
    <div className={classAttribute}>
      <p className={classAttribute}>
        {num_of_all_comments || 0}{" "}
        {formatTranslation(num_of_all_comments, "príspevok")},{" "}
        {num_of_my_comments} {formatTranslation(num_of_my_comments, "váš")}
        {isAdmin || !evaluation || (
          <span>
            , <BonusEvaluation evaluation={evaluation} />
          </span>
        )}
      </p>

      <HashLink
        smooth
        to={`${redirectTo}${queryString ? queryString : ""}${hash}`}
        className="btn btn-success btn-sm"
      >
        Diskutovať
      </HashLink>
    </div>
  );
}

export default Discussion;
