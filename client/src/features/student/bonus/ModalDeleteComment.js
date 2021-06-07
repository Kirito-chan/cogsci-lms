import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { deleteComment, loadComments } from "./bonusSlice";
import {
  deleteComment as deletePresentationComment,
  loadStudentComments,
  loadTeacherComments,
} from "../presentation/presentationSlice";
import { useParams } from "react-router";

function ModalDeleteComment({
  showOdstranit,
  setShowOdstranit,
  id,
  commentId,
  userName,
  isBonus,
  isTeachers,
}) {
  const closeModalOdstranit = () => setShowOdstranit(false);
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const handleOdstranit = () => {
    closeModalOdstranit();
    if (isBonus) {
      dispatch(deleteComment(commentId)).then(() => {
        dispatch(loadComments(id, subjectId));
      });
    } else {
      dispatch(deletePresentationComment(commentId, isTeachers)).then(() => {
        if (isTeachers) dispatch(loadTeacherComments(id, subjectId));
        else dispatch(loadStudentComments(id, subjectId));
      });
    }
  };

  return (
    <Modal show={showOdstranit} onHide={closeModalOdstranit} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Naozaj chcete odstrániť komentár užívateľa {userName} ?
        </Modal.Title>
      </Modal.Header>
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
