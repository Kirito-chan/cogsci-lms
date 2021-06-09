import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteBonus } from "./bonusSlice";
import { loadBonuses } from "../home/homeSlice";

function ModalDelete({
  showOdstranit,
  setShowOdstranit,
  bonus,
  currentUserId,
  subjectId,
}) {
  const closeModalOdstranit = () => setShowOdstranit(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOdstranit = () => {
    closeModalOdstranit();
    dispatch(deleteBonus(bonus.id)).then(() => {
      dispatch(loadBonuses(currentUserId, subjectId));
      history.push(`/subject/${subjectId}/bonus`);
    });
  };

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
