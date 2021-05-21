import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  loadTeacherPresentations,
  uploadPresentation,
} from "../../student/home/homeSlice";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import LoadingInButton from "../../../components/LoadingInButton";

function UploadTeacherPresentations() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const { subjectId } = useParams();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);
    const file = fileInputRef.current.files[0];
    dispatch(uploadPresentation(file, subjectId, null, true)).then(() => {
      dispatch(loadTeacherPresentations(currentUserId, subjectId));
      setLoading(false);
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
          {loading ? <LoadingInButton /> : "Pridať prezentáciu"}
        </Button>
      </Form>
    </div>
  );
}

export default UploadTeacherPresentations;
