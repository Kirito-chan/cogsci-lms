import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { deleteOldAndInsertNewPresentationCriteria } from "../../student/home/homeSlice";
import {
  getValuationTypes,
  loadValuationTypes,
} from "../../student/presentation/presentationSlice";
import PresentationCriteriaView from "./PresentationCriteriaView";

function PresentationCriteria() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const valuationTypes = useSelector(getValuationTypes);
  const [values, setValues] = useState([]);
  const [errorSum, setErrorSum] = useState("d-none");
  const [allAreInvalid, setAllAreInvalid] = useState(false);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (subjectId) {
      dispatch(loadValuationTypes(subjectId));
    }
  }, [subjectId]);

  useEffect(() => {
    if (valuationTypes.length) {
      let valuesCopy = JSON.parse(JSON.stringify([]));
      valuationTypes.map((type) => {
        valuesCopy.push({ id: type.id, name: type.point, height: type.height });
      });
      setValues(valuesCopy);
    }
  }, [valuationTypes]);

  const handleHeight = (event) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) || newValue == "") {
      let valuesCopy = JSON.parse(JSON.stringify(values));

      for (let i = 0; i < valuesCopy.length; i++) {
        if (valuesCopy[i].id == event.target.id) {
          valuesCopy[i].height = newValue;
          break;
        }
      }
      setValues(valuesCopy);
    }
  };

  const handleName = (event) => {
    const newValue = event.target.value;
    let valuesCopy = JSON.parse(JSON.stringify(values));

    for (let i = 0; i < valuesCopy.length; i++) {
      if (valuesCopy[i].id == event.target.id) {
        valuesCopy[i].name = newValue;
        break;
      }
    }
    setValues(valuesCopy);
  };

  const addCriterion = () => {
    let valuesCopy = JSON.parse(JSON.stringify(values));
    valuesCopy.push({ id: "_" + count, name: "", height: "" });
    setCount(count + 1);
    setValues(valuesCopy);
  };

  const deleteCriterion = (e) => {
    let index = -1;
    let valuesCopy = JSON.parse(JSON.stringify(values));
    for (let i = 0; i < valuesCopy.length; i++) {
      if (valuesCopy[i].id == e.target.id) {
        index = i;
        break;
      }
    }
    valuesCopy.splice(index, 1);
    setValues(valuesCopy);
  };

  const submitForm = (e) => {
    let sum = 0;
    for (const item of values) {
      sum += parseInt(item.height);
      // aby zobrazil hlasku ze policko je Required ak nevyplnil aspon jedno policko
      if (item.height == "" || item.name == "") {
        return;
      }
    }
    e.preventDefault();
    if (sum != 100) {
      setErrorSum("d-inline-block");
      setAllAreInvalid(true);
      return;
    }
    // ak vsetko vyplnil a sucet je 100%, tak zapis do DB
    setErrorSum("d-none");
    setAllAreInvalid(false);
    let wereJustUpdatedNotDeletedOrInserted = true;
    if (values.length !== valuationTypes.length)
      wereJustUpdatedNotDeletedOrInserted = false;
    for (const value of values) {
      if (String(value.id).includes("_"))
        wereJustUpdatedNotDeletedOrInserted = false;
    }

    setLoading(true);
    dispatch(
      deleteOldAndInsertNewPresentationCriteria(
        subjectId,
        values,
        wereJustUpdatedNotDeletedOrInserted
      )
    ).then(() => {
      dispatch(loadValuationTypes(subjectId)).then(() => {
        setLoading(false);
      });
    });
  };

  return (
    <PresentationCriteriaView
      values={values}
      errorSum={errorSum}
      allAreInvalid={allAreInvalid}
      submitForm={submitForm}
      addCriterion={addCriterion}
      deleteCriterion={deleteCriterion}
      handleName={handleName}
      handleHeight={handleHeight}
      loading={loading}
    />
  );
}

export default PresentationCriteria;
