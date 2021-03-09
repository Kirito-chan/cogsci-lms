import React from "react";
import formatDate from "../../../components/DateUtils";
import { URL_BONUSES } from "../../../constants";
import BonusVideo from "../bonuses/BonusVideo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Discussion from "../home/Discussion";
import "./BonusInfo.css";
import Loader from "react-loader-spinner";
import Navigation from "../../../components/Navigation";

function BonusInfo({ headerComponent, bonus, subjectId }) {
  const bonusCreated = bonus?.created && formatDate(bonus.created);

  return (
    <div>
      {bonus && Object.entries(bonus).length ? (
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
      ) : (
        <div>
          <Navigation />
          <div className="d-flex justify-content-center">
            <Loader type="Oval" color="#00BFFF" height={100} width={100} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BonusInfo;
