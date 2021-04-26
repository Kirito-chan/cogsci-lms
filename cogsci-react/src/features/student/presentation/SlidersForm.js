import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Slider from "@material-ui/core/Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  getValuationTypes,
  insertPresentationEvaluation,
  loadValuationTypes,
} from "./presentationSlice";
import { useParams } from "react-router";
import { getCurrentUserId } from "../../../app/currentUserSlice";
import {
  loadStudentPresentationsOpened,
  //updateHasEvaluatedToTrue,
} from "../home/homeSlice";
import { MAX_POINT_HEIGHT_PRES_EVALUATION } from "../../../constants";
import { loadMyPresentation } from "../../admin/student-detail/studentDetailSlice";

export default function SlidersForm({ evaluatedUserId }) {
  const dispatch = useDispatch();
  const { subjectId, presentationId } = useParams();
  const currentUserId = useSelector(getCurrentUserId);
  const valuationTypes = useSelector(getValuationTypes);
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (subjectId) {
      dispatch(loadValuationTypes(subjectId));
    }
  }, [subjectId]);

  useEffect(() => {
    if (valuationTypes.length && !values.length) {
      let valuesCopy = JSON.parse(JSON.stringify(values));
      valuationTypes.map((type) => {
        valuesCopy.push({ name: type.point, value: 5 });
      });
      setValues(valuesCopy);
    }
  }, [valuationTypes]);

  const handleChange = (event, newValue) => {
    let valuesCopy = JSON.parse(JSON.stringify(values));

    for (let i = 0; i < valuesCopy.length; i++) {
      if (valuesCopy[i].name === event.target.id) {
        valuesCopy[i].value = newValue;
        break;
      }
    }
    setValues(valuesCopy);
  };

  const sendValuation = (e) => {
    e.preventDefault();
    dispatch(
      insertPresentationEvaluation(
        subjectId,
        presentationId,
        currentUserId,
        evaluatedUserId,
        values
      )
    ).then(() => {
      dispatch(loadStudentPresentationsOpened(currentUserId, subjectId));
      dispatch(loadMyPresentation(evaluatedUserId, subjectId));
    });
  };

  return (
    <div>
      <Form onSubmit={sendValuation}>
        <Form.Group>
          {values && values.length === 0 && (
            <p className="font-italic">
              Neboli ešte vložené kritéria hodnotenia, musíte počkať kým ich
              učiteľ vloží
            </p>
          )}
          {values.map((type, i) => (
            <div key={i} className="mb-4">
              <Form.Label>{type.name}</Form.Label>
              <Slider
                id={type.name}
                value={type.value}
                defaultValue={5}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-restrict"
                step={1}
                marks={marks}
                min={0}
                max={MAX_POINT_HEIGHT_PRES_EVALUATION}
                onChange={handleChange}
                className="ml-1"
              />
            </div>
          ))}
          <div className="d-flex justify-content-end">
            {values && values.length === 0 ? (
              ""
            ) : (
              <Button size="sm" type="submit" variant="success">
                Ohodnotiť
              </Button>
            )}
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}

const marks = [];
for (let index = 0; index <= MAX_POINT_HEIGHT_PRES_EVALUATION; index++) {
  const mark = { value: index, label: String(index) };
  marks.push(mark);
}

function valuetext(value) {
  return `${value}`;
}
