import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getCurrentUserId, getIsAdmin } from "../../../app/currentUserSlice";
import { loadTeacherPresentations } from "../home/homeSlice";
import ModalDeletePres from "./ModalDeletePres";
import { deletePresentation } from "./presentationSlice";

function DeleteButton({ presentation, isTeacherPres }) {
  const dispatch = useDispatch();
  const isAdmin = useSelector(getIsAdmin);
  const history = useHistory();
  const { subjectId } = useParams();
  const currentUserId = useSelector(getCurrentUserId);
  const [showOdstranit, setShowOdstranit] = useState(false);
  const closeModalOdstranit = () => setShowOdstranit(false);
  const showModalOdstranit = () => setShowOdstranit(true);

  const handleOdstranit = () => {
    closeModalOdstranit();
    dispatch(
      deletePresentation(presentation.id, presentation.path, subjectId)
    ).then(() => {
      dispatch(loadTeacherPresentations(currentUserId, subjectId));
      history.push(`/subject/${subjectId}/admin/presentation`);
    });
  };

  return (
    <React.Fragment>
      {isAdmin && isTeacherPres && (
        <Button
          size="sm"
          variant="outline-danger"
          onClick={showModalOdstranit}
          className="mx-2"
        >
          Odstrániť
        </Button>
      )}
      <ModalDeletePres
        showOdstranit={showOdstranit}
        closeModalOdstranit={closeModalOdstranit}
        presentation={presentation}
        handleOdstranit={handleOdstranit}
      />
    </React.Fragment>
  );
}

export default DeleteButton;
