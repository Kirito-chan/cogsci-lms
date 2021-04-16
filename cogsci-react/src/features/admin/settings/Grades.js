import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";
import {
  getSubjectValuation,
  loadSubjectValuation,
  updateSubjectValuation,
} from "../../student/home/homeSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Grades() {
  const dispatch = useDispatch();
  const subjectValuation = useSelector(getSubjectValuation);
  const { subjectId } = useParams();
  const [loading, setLoading] = useState(false);

  const [gradeA, setGradeA] = useState(null);
  const [gradeB, setGradeB] = useState(null);
  const [gradeC, setGradeC] = useState(null);
  const [gradeD, setGradeD] = useState(null);
  const [gradeE, setGradeE] = useState(null);
  const [gradeFx, setGradeFx] = useState(null);

  useEffect(() => {
    if (subjectId) {
      dispatch(loadSubjectValuation(subjectId));
    }
  }, [subjectId]);

  useEffect(() => {
    if (subjectValuation) {
      setGradeA(subjectValuation.A);
      setGradeB(subjectValuation.B);
      setGradeC(subjectValuation.C);
      setGradeD(subjectValuation.D);
      setGradeE(subjectValuation.E);
      setGradeFx(subjectValuation.Fx);
    }
  }, [subjectValuation]);

  const changeGrades = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      updateSubjectValuation(
        subjectId,
        gradeA,
        gradeB,
        gradeC,
        gradeD,
        gradeE,
        gradeFx
      )
    ).then(() => {
      dispatch(loadSubjectValuation(subjectId)).then(() => {
        setLoading(false);
      });
    });
  };

  return (
    showLoaderIfAnyNull(subjectValuation, gradeA) || (
      <div>
        <h2 className="mb-3">Stupnica hodnotenia</h2>
        <Form>
          <Row>
            <Col>
              {/* prettier-ignore */}
              <TextInput label="A" content={gradeA} handleContent={e => setGradeA(e.target.value)} />
              {/* prettier-ignore */}
              <TextInput label="B" content={gradeB} handleContent={e => setGradeB(e.target.value)} />
              {/* prettier-ignore */}
              <TextInput label="C" content={gradeC} handleContent={e => setGradeC(e.target.value)} />
              {/* prettier-ignore */}
              <TextInput label="D" content={gradeD} handleContent={e => setGradeD(e.target.value)} />
              {/* prettier-ignore */}
              <TextInput label="E" content={gradeE} handleContent={e => setGradeE(e.target.value)} />
              {/* prettier-ignore */}
              <TextInput label="Fx" content={gradeFx} handleContent={e => setGradeFx(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col className="text-right">
              <Button
                variant="success"
                type="submit"
                size="sm"
                onClick={changeGrades}
              >
                {loading ? (
                  <span>
                    <span
                      className={"spinner-border spinner-border-sm "}
                    ></span>{" "}
                    Loading...
                  </span>
                ) : (
                  "Uložiť zmeny"
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  );
}

function TextInput({ label, content, handleContent }) {
  return (
    <Form.Group as={Row}>
      <Form.Label column xs="1" className="text-left pl-3">
        <b>{label}</b>
      </Form.Label>
      <Col xs="11" sm="10" className="ml-sm-auto">
        <Form.Control
          required
          type="text"
          onChange={handleContent}
          value={content}
        />
      </Col>
    </Form.Group>
  );
}

export default Grades;
