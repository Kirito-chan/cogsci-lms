import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  updateSubject,
  loadSubjects,
  getCurrentSubject,
  loadSubject,
} from "../subjects/subjectsSlice";
import {
  TextAreaInputSettings,
  TextInputSettings,
} from "../../../components/FormComponents";

function SubjectParameters() {
  const dispatch = useDispatch();
  const subject = useSelector(getCurrentSubject);

  useEffect(() => {
    if (subject) {
      setSubjectName(subject.name);
      setActive(subject.status);
      setAboutSubject(subject.about);
      setUserLimit(subject.user_limit);
      setSeason(subject.season);
      setYear(subject.year);
      setWeeks(subject.weeks);
      setSubjectValPres(subject.val_presentation);
      setSubjectValAttendance(subject.val_attendance);
      setSubjectValComment(subject.val_comment);
    }
  }, [subject]);

  const [subjectName, setSubjectName] = useState("");
  const handleSubjectName = (e) => setSubjectName(e.target.value);

  const [subjectValPres, setSubjectValPres] = useState("");
  const handleSubjectValPres = (e) => setSubjectValPres(e.target.value);

  const [subjectValAttendance, setSubjectValAttendance] = useState("");
  const handleSubjectValAttendance = (e) =>
    setSubjectValAttendance(e.target.value);

  const [subjectValComment, setSubjectValComment] = useState("");
  const handleSubjectValComment = (e) => setSubjectValComment(e.target.value);

  const [active, setActive] = useState(SUBJ_IS_NOT_ACTIVE);
  const handleActiveType = (e) => setActive(e.target.value);

  const [aboutSubject, setAboutSubject] = useState("");
  const handleAboutSubject = (e) => setAboutSubject(e.target.value);

  const [userLimit, setUserLimit] = useState("");
  const handleUserLimit = (e) => setUserLimit(e.target.value);

  const [season, setSeason] = useState("");
  const handleSeason = (e) => setSeason(e.target.value);

  const [year, setYear] = useState("");
  const handleYear = (e) => setYear(e.target.value);

  const [weeks, setWeeks] = useState("");
  const handleWeeks = (e) => setWeeks(e.target.value);

  const [sum, setSum] = useState();
  const [errorSum, setErrorSum] = useState("d-none");
  const [allAreInvalid, setAllAreInvalid] = useState(false);

  const handleUpdateSubject = (e) => {
    e.preventDefault();
    const sum =
      parseInt(subjectValPres) +
      parseInt(subjectValAttendance) +
      parseInt(subjectValComment);
    if (sum !== 100) {
      setSum(sum);
      setErrorSum("d-inline-block");
      setAllAreInvalid(true);
      return;
    }
    setErrorSum("d-none");
    setAllAreInvalid(false);
    dispatch(
      updateSubject(
        subject.id,
        subjectName,
        year,
        season,
        aboutSubject,
        userLimit,
        weeks,
        active,
        subjectValPres,
        subjectValAttendance,
        subjectValComment
      )
    ).then(() => {
      dispatch(loadSubject(subject.id));
      dispatch(loadSubjects());
    });
  };

  return (
    <div>
      <h3 className="mb-4">Parametre predmetu</h3>
      <Form>
        <TextInputSettings
          title="Názov predmetu"
          content={subjectName}
          handleContent={handleSubjectName}
        />
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            <b>Stav</b>
          </Form.Label>
          <Col sm="5">
            <Form.Control
              as="select"
              onChange={handleActiveType}
              value={active}
            >
              <option value={SUBJ_IS_ACTIVE}>Aktívny</option>
              <option value={SUBJ_IS_NOT_ACTIVE}>Neaktívny</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <TextInputSettings
          title="Školský rok (yyyy/yyyy)"
          content={year}
          handleContent={handleYear}
        />
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            <b>Semester</b>
          </Form.Label>
          <Col sm="5">
            <Form.Control as="select" onChange={handleSeason} value={season}>
              <option value={WINTER_SEASON}>Zimný semester</option>
              <option value={SUMMER_SEASON}>Letný semester</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <TextInputSettings
          title="Limit počtu študentov"
          content={userLimit}
          handleContent={handleUserLimit}
        />
        <TextInputSettings
          title="Počet týždňov"
          content={weeks}
          handleContent={handleWeeks}
        />
        <TextInputSettings
          title="Váha prezentácie"
          content={subjectValPres}
          handleContent={handleSubjectValPres}
          allAreInvalid={allAreInvalid}
        />
        <TextInputSettings
          title="Váha dochádzky"
          content={subjectValAttendance}
          handleContent={handleSubjectValAttendance}
          allAreInvalid={allAreInvalid}
        />
        <TextInputSettings
          title="Váha bonusových úloh"
          content={subjectValComment}
          handleContent={handleSubjectValComment}
          allAreInvalid={allAreInvalid}
        />

        <TextAreaInputSettings
          title="O predmete"
          content={aboutSubject}
          handleContent={handleAboutSubject}
          rows={3}
        />
        <div className="text-center">
          <Button
            variant="success"
            size="sm"
            type="submit"
            onClick={handleUpdateSubject}
          >
            Uložiť zmeny
          </Button>
        </div>
        <Row className="mt-2">
          <Col sm="2"></Col>
          <Col sm="5" className="text-right">
            <span className={"text-danger " + errorSum}>
              Súčet váh prezentácie je {sum}, musí byť 100 !
            </span>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SubjectParameters;
