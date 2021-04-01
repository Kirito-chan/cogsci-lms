import React, { useEffect, useState } from "react";
import formatDate from "../../../components/DateUtils";
import { URL_BONUSES } from "../../../constants";
import BonusVideo from "../bonuses/BonusVideo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Discussion from "../home/Discussion";
import "./Bonus.css";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";
import { useDispatch } from "react-redux";
import { deleteBonus, loadBonus, updateBonusInfo } from "./bonusSlice";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import { useHistory } from "react-router";

function BonusInfo({
  headerComponent,
  bonus,
  subjectId,
  isAdmin,
  currentUserId,
}) {
  const dispatch = useDispatch();
  const bonusCreated = bonus?.created && formatDate(bonus.created);
  const bonusUpdated = bonus?.updated && formatDate(bonus.updated);
  const history = useHistory();
  const [showOdstranit, setShowOdstranit] = useState(false);
  const [showUpravit, setShowUpravit] = useState(false);
  const [nadpis, setNadpis] = useState("");
  const [obsah, setObsah] = useState("");
  const [videoURL, setVideoURL] = useState("");

  const handleNadpis = (e) => setNadpis(e.target.value);
  const handleObsah = (e) => setObsah(e.target.value);
  const handleVideoURL = (e) => setVideoURL(e.target.value);

  const closeModalOdstranit = () => setShowOdstranit(false);
  const showModalOdstranit = () => setShowOdstranit(true);
  const closeModalUpravit = () => setShowUpravit(false);
  const showModalUpravit = () => setShowUpravit(true);

  useEffect(() => {
    if (bonus) {
      setNadpis(bonus.title);
      setObsah(bonus.content);
      setVideoURL(bonus.video_URL);
    }
  }, [bonus]);

  const handleUpravit = () => {
    closeModalUpravit();
    dispatch(updateBonusInfo(bonus.id, nadpis, obsah, videoURL)).then(() => {
      dispatch(loadBonus(currentUserId, subjectId));
    });
  };

  const handleOdstranit = () => {
    closeModalOdstranit();
    dispatch(deleteBonus(bonus.id)).then(() => {
      dispatch(loadBonus(currentUserId, subjectId));
      history.push(`/subject/${subjectId}/admin/bonus`);
    });
  };

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
              />
            </Col>

            <Col lg={6}>
              {bonus.video_URL && bonus.video_URL != "null" && (
                <BonusVideo url={bonus.video_URL} />
              )}
            </Col>
          </Row>

          <ModalDelete
            showOdstranit={showOdstranit}
            closeModalOdstranit={closeModalOdstranit}
            bonus={bonus}
            handleOdstranit={handleOdstranit}
          />

          <ModalEdit
            showUpravit={showUpravit}
            closeModalUpravit={closeModalUpravit}
            bonus={bonus}
            handleNadpis={handleNadpis}
            nadpis={nadpis}
            handleObsah={handleObsah}
            obsah={obsah}
            handleVideoURL={handleVideoURL}
            videoURL={videoURL}
            handleUpravit={handleUpravit}
          />
        </article>
      )}
    </div>
  );
}

export default BonusInfo;
