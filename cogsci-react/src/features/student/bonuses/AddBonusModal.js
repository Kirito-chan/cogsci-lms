import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { TextAreaInput, TextInput } from "../../../components/FormComponents";
import Form from "react-bootstrap/Form";
import { loadBonuses } from "../home/homeSlice";
import { useDispatch } from "react-redux";
import { insertBonus } from "../../admin/home/homeSlice";

function AddBonusModal({ showAddBonus, setShowAddBonus, subjectId }) {
  const dispatch = useDispatch();
  const [bonusTitle, setBonusTitle] = useState("");
  const handleBonusTitle = (e) => setBonusTitle(e.target.value);

  const [bonusContent, setBonusContent] = useState("");
  const handleBonusContent = (e) => setBonusContent(e.target.value);

  const [urlRef, setUrlRef] = useState("");
  const handleUrlRef = (e) => setUrlRef(e.target.value);

  const closeModalAddBonus = () => {
    setShowAddBonus(false);
    resetInputs();
  };

  const resetInputs = () => {
    setBonusTitle("");
    setBonusContent("");
    setUrlRef("");
  };

  const handleAddBonus = (e) => {
    e.preventDefault();
    closeModalAddBonus();

    dispatch(insertBonus(subjectId, bonusTitle, bonusContent, urlRef)).then(
      () => {
        dispatch(loadBonuses());
        resetInputs();
      }
    );
  };

  return (
    <Modal
      show={showAddBonus}
      onHide={closeModalAddBonus}
      centered
      size="lg"
      backdrop="static"
    >
      <Form onSubmit={handleAddBonus}>
        <Modal.Header closeButton>
          <Modal.Title>Pridať nový bonus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            title="Názov bonusu"
            content={bonusTitle}
            handleContent={handleBonusTitle}
          />

          <TextAreaInput
            title="Obsah"
            content={bonusContent}
            handleContent={handleBonusContent}
            rows={3}
          />

          <TextInput
            title="URL odkaz"
            content={urlRef}
            handleContent={handleUrlRef}
          />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={closeModalAddBonus}>
            Zrušiť
          </Button>
          <Button variant="success" type="submit">
            Pridať bonus
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddBonusModal;
