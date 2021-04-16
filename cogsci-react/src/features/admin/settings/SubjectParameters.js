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
} from "../subjects/subjectsSlice";
import {
  getCurrentSchoolYear,
  getCurrentSeason,
} from "../../../components/DateUtils";
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

  const [subjectName, setSubjectName] = useState();
  const handleSubjectName = (e) => setSubjectName(e.target.value);

  const [subjectValPres, setSubjectValPres] = useState();
  const handleSubjectValPres = (e) => setSubjectValPres(e.target.value);

  const [subjectValAttendance, setSubjectValAttendance] = useState();
  const handleSubjectValAttendance = (e) =>
    setSubjectValAttendance(e.target.value);

  const [subjectValComment, setSubjectValComment] = useState();
  const handleSubjectValComment = (e) => setSubjectValComment(e.target.value);

  const [active, setActive] = useState(SUBJ_IS_ACTIVE);
  const handleActiveType = (e) => {
    const index = e.target.selectedIndex;
    const activeType = e.target.childNodes[index].getAttribute("activetype");
    setActive(activeType);
  };

  const [aboutSubject, setAboutSubject] = useState("");
  const handleAboutSubject = (e) => setAboutSubject(e.target.value);

  const [userLimit, setUserLimit] = useState("");
  const handleUserLimit = (e) => setUserLimit(e.target.value);

  const [season, setSeason] = useState(getCurrentSeason);
  const handleSeason = (e) => {
    const index = e.target.selectedIndex;
    const seasonType = e.target.childNodes[index].getAttribute("semestertype");
    setSeason(seasonType);
  };

  const [year, setYear] = useState(getCurrentSchoolYear);
  const handleYear = (e) => setYear(e.target.value);

  const [weeks, setWeeks] = useState("");
  const handleWeeks = (e) => setWeeks(e.target.value);

  const resetInputs = () => {
    setActive(SUBJ_IS_ACTIVE);
    setSeason(getCurrentSeason);
    setSubjectName("");
    setYear(getCurrentSchoolYear);
    setWeeks("");
    setUserLimit("");
    setAboutSubject("");
  };

  const handleUpdateSubject = () => {
    dispatch(
      updateSubject(
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
            <Form.Control as="select" onChange={handleActiveType}>
              <option activetype={SUBJ_IS_ACTIVE}>Aktívny</option>
              <option activetype={SUBJ_IS_NOT_ACTIVE}>Neaktívny</option>
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
        />
        <TextInputSettings
          title="Váha dochádzky"
          content={subjectValAttendance}
          handleContent={handleSubjectValAttendance}
        />
        <TextInputSettings
          title="Váha bonusových úloh"
          content={subjectValComment}
          handleContent={handleSubjectValComment}
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
      </Form>
    </div>
  );
}

export default SubjectParameters;
