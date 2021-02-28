import React from "react";
import formatDate from "../../../components/DateUtils";
import { Link } from "react-router-dom";
import { URL_BONUSES } from "../../../constants";
import BonusVideo from "../bonuses/BonusVideo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Discussion from "../home/Discussion";
import "./BonusInfo.css";

function BonusInfo({ headerComponent, bonus, subjectId }) {
  const bonusCreated = bonus?.created && formatDate(bonus.created);
  return (
    <article key={bonus?.id} className="mb-5">
      <Row>
        <Col>
          <Link
            to={"/subject/" + subjectId + URL_BONUSES + "/" + bonus?.id}
            className="pl-0 font-weight-bold"
          >
            {headerComponent}
          </Link>
          <p className="small">Vytvorené: {bonusCreated}</p>
        </Col>
      </Row>
      <Row>
        <Col lg={6} className="break-long-word">
          <p>{bonus?.content}</p>
          <p className="mb-0">
            <b>Odkaz na bonus</b>
          </p>
          <p>
            <a
              target="_blank"
              href={bonus?.video_URL}
              rel="noopener noreferrer"
            >
              {bonus?.video_URL}
            </a>
          </p>
          <p className="mb-0">
            <b>Diskusia</b>
          </p>
          <Discussion
            data={bonus}
            classAttribute="d-inline-block mr-3"
            evaluation={bonus?.evaluation}
          />
        </Col>

        <Col lg={6}>
          <BonusVideo url={bonus?.video_URL} />
        </Col>
      </Row>
    </article>
  );
}

export default BonusInfo;
