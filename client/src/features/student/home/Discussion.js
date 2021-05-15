import React from "react";
import formatTranslation from "../../../components/utils/StringUtils";
import BonusEvaluation from "./bonuses/BonusEvaluation";
import { HashLink } from "react-router-hash-link";
import { useSelector } from "react-redux";
import { getIsAdmin } from "../../../app/currentUserSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Discussion({
  data,
  evaluation,
  redirectTo,
  hash,
  queryString,
  inBonusesInfo,
  hodnotitElement,
  isTeacherPres,
}) {
  const isAdmin = useSelector(getIsAdmin);
  const num_of_all_comments = data?.num_all_comments;
  const num_of_my_comments = data?.num_of_comments;
  // when in homepage bonus
  let xl1 = 7;
  let lg1 = 8;
  let md1 = 5;
  let sm1 = 7;
  let xs1 = 8;
  let xl2, lg2, md2, sm2, xs2;
  xl2 = lg2 = md2 = sm2 = xs2 = 1;

  if (inBonusesInfo) {
    md1 += 1;
    sm1 += 1;
    xl2 = lg2 = md2 = sm2 = xs2 = 3;
  }
  if (hodnotitElement) {
    xl1 = 5;
    lg1 = 6;
    md1 = 4;
    sm1 = 4;
    xs1 = 5;
  }
  if (isTeacherPres) {
    xl1 = 8;
    xl2 = 2;
    lg1 = 8;
    lg2 = 2;
    md1 = 9;
    md2 = 3;
    sm1 = 9;
    sm2 = 2;
    xs1 = 8;
    xs2 = 1;
  }

  return (
    <React.Fragment>
      <Row>
        {hodnotitElement && (
          <Col xl={xl2 + 2} lg={lg2 + 2} md={md2 + 1} sm={sm2 + 1} xs={xs2 + 2}>
            {hodnotitElement}
          </Col>
        )}
        <Col xl={xl1} lg={lg1} md={md1} sm={sm1} xs={xs1}>
          <p>
            {num_of_all_comments || 0}{" "}
            {formatTranslation(num_of_all_comments, "príspevok")},{" "}
            {num_of_my_comments} {formatTranslation(num_of_my_comments, "váš")}
            {isAdmin || !evaluation || (
              <span>
                , <BonusEvaluation evaluation={evaluation} />
              </span>
            )}
          </p>
        </Col>

        <Col xl={xl2} lg={lg2} md={md2} sm={sm2} xs={xs2}>
          <HashLink
            smooth
            to={`${redirectTo}${queryString ? queryString : ""}${hash}`}
            className="btn btn-success btn-sm"
          >
            Diskutovať
          </HashLink>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Discussion;
