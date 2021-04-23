import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { deleteComment, loadComments } from "./bonusSlice";

function ModalDeleteComment({
  showOdstranit,
  setShowOdstranit,
  bonusId,
  commentId,
  userName,
}) {
  const closeModalOdstranit = () => setShowOdstranit(false);
  const dispatch = useDispatch();

  const handleOdstranit = () => {
    closeModalOdstranit();
    dispatch(deleteComment(commentId)).then(() => {
      dispatch(loadComments(bonusId));
    });
  };

  return (
    <Modal show={showOdstranit} onHide={closeModalOdstranit} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Naozaj chcete odstrániť komentár užívateľa {userName} ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Spolu s ním sa odstránia aj všetky podkomentáre.</Modal.Body>
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

export default ModalDeleteComment;
