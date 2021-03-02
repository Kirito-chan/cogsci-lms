import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Slider from "@material-ui/core/Slider";
import { useDispatch, useSelector } from "react-redux";
import { getValuationTypes, loadValuationTypes } from "./presentationSlice";
import { useParams } from "react-router";

export default function SlidersForm() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
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

  const sendValuation = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <div>
      <Form onSubmit={sendValuation}>
        <Form.Group>
          {values.map((type, i) => (
            <div key={i}>
              <Form.Label as="legend">
                <b>{type.name}</b>
              </Form.Label>
              <Slider
                id={type.name}
                value={type.value}
                defaultValue={5}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-restrict"
                step={1}
                marks={marks}
                min={0}
                max={10}
                onChange={handleChange}
              />
            </div>
          ))}

          <Button size="sm" type="submit" variant="success">
            Ohodnotiť
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
];

function valuetext(value) {
  return `${value}`;
}
