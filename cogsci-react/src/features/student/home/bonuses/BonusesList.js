import React from "react";

import Discussion from "../Discussion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { URL_BONUSES } from "../../../../constants";
import { Link } from "react-router-dom";

function BonusesList({ bonuses, subjectId }) {
  return (
    <div className="mt-5">
      <h2>Bonusové úlohy</h2>

      {bonuses.map((bonus, i) => (
        <article key={bonus.id}>
          <Row>
            <Col>
              <Link
                to={URL_BONUSES + "/" + bonus?.id + "/subject/" + subjectId}
                className="pl-0 nav-link"
              >
                {bonuses.length - i}. {bonus.title}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Discussion
                data={bonus}
                classAttribute="d-inline-block mr-3"
                evaluation={bonus.evaluation}
              />
            </Col>
          </Row>
        </article>
      ))}
    </div>
  );
}

export default BonusesList;
