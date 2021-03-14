import React from "react";
import formatDate from "../../../components/DateUtils";
import { URL_BONUSES } from "../../../constants";
import BonusVideo from "../bonuses/BonusVideo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Discussion from "../home/Discussion";
import "./BonusInfo.css";
import { showLoaderIfNull } from "../../../components/StringUtils";

function BonusInfo({ headerComponent, bonus, subjectId }) {
  const bonusCreated = bonus?.created && formatDate(bonus.created);

  return (
    <div>
      {showLoaderIfNull(bonus) || (
        <article key={bonus?.id} className="mb-5">
          <Row>
            <Col>
              {headerComponent}
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
                {bonus.video_URL && bonus.video_URL != "null" ? (
                  // prettier-ignore
                  <a target="_blank" href={bonus?.video_URL} rel="noopener noreferrer">
                {bonus?.video_URL}
              </a>
                ) : (
                  <span className="font-italic">nepridaný</span>
                )}
              </p>
              <p className="mb-0">
                <b>Diskusia</b>
              </p>
              <Discussion
                data={bonus}
                classAttribute="d-inline-block mr-3"
                evaluation={bonus?.evaluation}
                redirectTo={`/subject/${subjectId}${URL_BONUSES}/${bonus?.id}`}
                hash="#myNewComment"
              />
            </Col>

            <Col lg={6}>
              {bonus.video_URL && bonus.video_URL != "null" && (
                <BonusVideo url={bonus?.video_URL} />
              )}
            </Col>
          </Row>
        </article>
      )}
    </div>
  );
}

export default BonusInfo;
