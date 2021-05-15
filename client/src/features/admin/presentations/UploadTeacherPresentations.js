import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  loadTeacherPresentations,
  uploadPresentation,
} from "../../student/home/homeSlice";
import { getCurrentUserId } from "../../../app/currentUserSlice";

function UploadTeacherPresentations() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const { subjectId } = useParams();
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    dispatch(uploadPresentation(file, subjectId, null, true)).then(() => {
      dispatch(loadTeacherPresentations(currentUserId, subjectId));
    });
  };
  return (
    <div>
      <h3>Pridanie učiteľskej prezentácie</h3>
      <Form className="mt-4" onSubmit={handleUpload}>
        <Form.Group>
          <Form.File ref={fileInputRef} />
        </Form.Group>
        <Button size="sm" type="submit" variant="success">
          Pridať prezentáciu
        </Button>
      </Form>
    </div>
  );
}

export default UploadTeacherPresentations;
