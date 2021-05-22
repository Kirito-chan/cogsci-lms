import React from "react";

import Discussion from "../Discussion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { URL_BONUSES } from "../../../../constants";
import { Link } from "react-router-dom";

function BonusesList({ bonuses, subjectId }) {
  return (
    <div>
      {bonuses.length === 0 && <p>Žiadne</p>}

      {bonuses.map((bonus, i) => (
        <article key={bonus.id}>
          <Row>
            <Col>
              <Link
                to={"/subject/" + subjectId + URL_BONUSES + "/" + bonus.id}
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
                redirectTo={`/subject/${subjectId}${URL_BONUSES}/${bonus.id}`}
                hash="#myNewComment"
              />
            </Col>
          </Row>
        </article>
      ))}
    </div>
  );
}

export default BonusesList;
