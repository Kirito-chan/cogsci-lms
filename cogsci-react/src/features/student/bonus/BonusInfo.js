import React, { useEffect, useState } from "react";
import formatDate from "../../../components/utils/DateUtils";
import { URL_BONUSES } from "../../../constants";
import BonusVideo from "../bonuses/BonusVideo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Discussion from "../home/Discussion";
import "./Bonus.css";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";

function BonusInfo({
  headerComponent,
  bonus,
  subjectId,
  isAdmin,
  currentUserId,
}) {
  const bonusCreated = bonus?.created && formatDate(bonus.created);
  const bonusUpdated = bonus?.updated && formatDate(bonus.updated);

  const [showOdstranit, setShowOdstranit] = useState(false);
  const showModalOdstranit = () => setShowOdstranit(true);

  const [showUpravit, setShowUpravit] = useState(false);
  const showModalUpravit = () => setShowUpravit(true);

  const [url, setURL] = useState(null);

  useEffect(() => {
    if (bonus) {
      let newUrl = bonus.video_URL;

      if (newUrl.includes("ted") && !newUrl.includes("embed")) {
        newUrl = new URL(newUrl);
        newUrl.hostname = newUrl.hostname.replace("www", "embed");
        newUrl = newUrl.href;
      }
      setURL(newUrl);
    }
  }, [bonus]);

  return (
    <div>
      {showLoaderIfAnyNull(bonus) || (
        <article key={bonus.id} className="mb-5">
          <Row>
            <Col>
              <div className="d-flex">
                {headerComponent}
                <div className="ml-auto pt-1">
                  {isAdmin && (
                    <div>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={showModalOdstranit}
                        className="mx-2"
                      >
                        Odstrániť
                      </Button>

                      <Button
                        size="sm"
                        variant="warning"
                        onClick={showModalUpravit}
                      >
                        Upraviť
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <p className="small">
                Vytvorené {bonusCreated}, Upravené {bonusUpdated} (
                {bonus.updated_count}x)
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="break-long-word">
              <p>{bonus.content}</p>
              <p className="mb-0">
                <b>Odkaz na bonus</b>
              </p>
              <p>
                {bonus.video_URL && bonus.video_URL != "null" ? (
                  // prettier-ignore
                  <a target="_blank" href={bonus.video_URL} rel="noopener noreferrer">
                {bonus.video_URL}
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
                evaluation={bonus.evaluation}
                redirectTo={`/subject/${subjectId}${URL_BONUSES}/${bonus.id}`}
                hash="#myNewComment"
                inBonusesInfo={true}
              />
            </Col>

            <Col lg={6}>
              {url && url != "null" && (
                <BonusVideo url={url} isFocusing={bonus.is_focusing_URL} />
              )}
            </Col>
          </Row>

          <ModalDelete
            showOdstranit={showOdstranit}
            setShowOdstranit={setShowOdstranit}
            currentUserId={currentUserId}
            subjectId={subjectId}
            bonus={bonus}
          />

          <ModalEdit
            showUpravit={showUpravit}
            setShowUpravit={setShowUpravit}
            currentUserId={currentUserId}
            subjectId={subjectId}
            bonus={bonus}
          />
        </article>
      )}
    </div>
  );
}

export default BonusInfo;
