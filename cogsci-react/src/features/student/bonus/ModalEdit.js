import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { loadBonus, updateBonusInfo } from "./bonusSlice";

function ModalEdit({
  showUpravit,
  setShowUpravit,
  bonus,
  subjectId,
  currentUserId,
}) {
  const dispatch = useDispatch();
  const [nadpis, setNadpis] = useState("");
  const [obsah, setObsah] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [isFocusingURL, setIsFocusingURL] = useState(bonus.is_focusing_URL);

  const handleNadpis = (e) => setNadpis(e.target.value);
  const handleObsah = (e) => setObsah(e.target.value);
  const handleVideoURL = (e) => setVideoURL(e.target.value);
  const handleIsFocusingURL = (e) => setIsFocusingURL(e.target.checked);

  const closeModalUpravit = () => setShowUpravit(false);

  useEffect(() => {
    if (bonus) {
      setNadpis(bonus.title);
      setObsah(bonus.content);
      setVideoURL(bonus.video_URL);
    }
  }, [bonus]);

  const handleUpravit = () => {
    closeModalUpravit();
    dispatch(
      updateBonusInfo(bonus.id, nadpis, obsah, videoURL, isFocusingURL)
    ).then(() => {
      dispatch(loadBonus(currentUserId, subjectId));
    });
  };

  return (
    <Modal
      show={showUpravit}
      onHide={closeModalUpravit}
      centered
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Upraviť bonus č. {bonus.orderNumber}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            <b> Nadpis:</b>
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" onChange={handleNadpis} value={nadpis} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            <b> Obsah:</b>
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleObsah}
              value={obsah}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            <b> URL odkaz:</b>
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              onChange={handleVideoURL}
              value={videoURL}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm="2"></Col>
          <Col sm="10">
            <Form.Check
              type="checkbox"
              label="Korekcia"
              onChange={handleIsFocusingURL}
              checked={isFocusingURL}
            />
          </Col>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={closeModalUpravit}>
          Zrušiť
        </Button>
        <Button variant="success" type="submit" onClick={handleUpravit}>
          Uložiť zmeny
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEdit;
