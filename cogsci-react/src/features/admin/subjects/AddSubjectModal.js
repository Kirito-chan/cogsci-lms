import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
  SUBJ_IS_ACTIVE,
  SUBJ_IS_NOT_ACTIVE,
  SUMMER_SEASON,
  WINTER_SEASON,
} from "../../../constants";
import { useDispatch } from "react-redux";
import { insertSubject, loadSubjects } from "./subjectsSlice";
import {
  getCurrentSchoolYear,
  getCurrentSeason,
} from "../../../components/utils/DateUtils";
import { TextAreaInput, TextInput } from "../../../components/FormComponents";

function AddSubjectModal({ showAddSubject, setShowAddSubject }) {
  const dispatch = useDispatch();

  const [subjectName, setSubjectName] = useState("");
  const handleSubjectName = (e) => setSubjectName(e.target.value);

  const [active, setActive] = useState(SUBJ_IS_ACTIVE);
  const handleActiveType = (e) => setActive(e.target.value);

  const [aboutSubject, setAboutSubject] = useState("");
  const handleAboutSubject = (e) => setAboutSubject(e.target.value);

  const [userLimit, setUserLimit] = useState("");
  const handleUserLimit = (e) => setUserLimit(e.target.value);

  const [season, setSeason] = useState(getCurrentSeason);
  const handleSeason = (e) => setSeason(e.target.value);

  const [year, setYear] = useState(getCurrentSchoolYear);
  const handleYear = (e) => setYear(e.target.value);

  const [weeks, setWeeks] = useState("");
  const handleWeeks = (e) => setWeeks(e.target.value);

  const closeModalAddSubject = () => {
    setShowAddSubject(false);
    resetInputs();
  };

  const resetInputs = () => {
    setActive(SUBJ_IS_ACTIVE);
    setSeason(getCurrentSeason);
    setSubjectName("");
    setYear(getCurrentSchoolYear);
    setWeeks("");
    setUserLimit("");
    setAboutSubject("");
  };

  const handleAddSubject = () => {
    closeModalAddSubject();

    dispatch(
      insertSubject(
        subjectName,
        year,
        season,
        aboutSubject,
        userLimit,
        weeks,
        active
      )
    ).then(() => {
      dispatch(loadSubjects());
      resetInputs();
    });
  };

  return (
    <Modal
      show={showAddSubject}
      onHide={closeModalAddSubject}
      centered
      size="lg"
      backdrop="static"
    >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Pridať nový predmet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            title="Názov predmetu"
            content={subjectName}
            handleContent={handleSubjectName}
          />
          <Form.Group as={Row}>
            <Form.Label column sm="3" className="text-right">
              <b>Stav</b>
            </Form.Label>
            <Col sm="9">
              <Form.Control as="select" onChange={handleActiveType}>
                <option value={SUBJ_IS_ACTIVE}>Aktívny</option>
                <option value={SUBJ_IS_NOT_ACTIVE}>Neaktívny</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <TextInput
            title="Školský rok (yyyy/yyyy)"
            content={year}
            handleContent={handleYear}
          />

          <Form.Group as={Row}>
            <Form.Label column sm="3" className="text-right">
              <b>Semester</b>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                as="select"
                onChange={handleSeason}
                defaultValue={"" + getCurrentSeason()}
              >
                <option value={WINTER_SEASON}>Zimný semester</option>
                <option value={SUMMER_SEASON}>Letný semester</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <TextInput
            title="Limit počtu študentov"
            content={userLimit}
            handleContent={handleUserLimit}
          />
          <TextInput
            title="Počet týždňov"
            content={weeks}
            handleContent={handleWeeks}
          />
          <TextAreaInput
            title="O predmete"
            content={aboutSubject}
            handleContent={handleAboutSubject}
            rows={3}
          />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={closeModalAddSubject}>
            Zrušiť
          </Button>
          <Button variant="success" type="submit" onClick={handleAddSubject}>
            Pridať predmet
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddSubjectModal;
