import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalDelete({
  showOdstranit,
  closeModalOdstranit,
  handleOdstranit,
  bonus,
}) {
  return (
    <Modal show={showOdstranit} onHide={closeModalOdstranit} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Naozaj chcete odstrániť bonus č. {bonus.orderNumber} ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{bonus.title}</Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={closeModalOdstranit}>
          Nie
        </Button>
        <Button variant="danger" onClick={handleOdstranit}>
          Áno, odstrániť
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;
