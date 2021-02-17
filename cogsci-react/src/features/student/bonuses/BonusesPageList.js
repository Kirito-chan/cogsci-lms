import React from "react";
import Navigation from "../../../components/Navigation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Discussion from "../home/Discussion";
import "./BonusesPageList.css";
import formatDate from "../../../components/DateUtils";
import { Link } from "react-router-dom";
import { URL_BONUSES } from "../../../constants";
import BonusVideo from "./BonusVideo";

function BonusesPageList({ bonuses, subjectId }) {
  return (
    <div>
      <Navigation />
      <h1 className="text-center mb-4">Bonusové úlohy</h1>

      {bonuses.map((bonus, i) => (
        <article
          key={bonus.id}
          className="mx-lg-5 border border-dark rounded p-3 mb-5"
        >
          <Row>
            <Col>
              <Link
                to={URL_BONUSES + "/" + bonus.id + "/subject/" + subjectId}
                className="pl-0 font-weight-bold"
              >
                {bonuses.length - i}. {bonus.title}
              </Link>
              <p className="small">Vytvorené: {formatDate(bonus.created)}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{bonus.content}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <BonusVideo url={bonus.video_URL} />
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

export default BonusesPageList;
