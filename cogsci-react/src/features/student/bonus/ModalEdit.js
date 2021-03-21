import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ModalEdit({
  showUpravit,
  closeModalUpravit,
  bonus,
  handleNadpis,
  nadpis,
  handleObsah,
  obsah,
  handleVideoURL,
  videoURL,
  handleUpravit,
}) {
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
