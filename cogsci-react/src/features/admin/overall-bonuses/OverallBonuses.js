import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Navigation from "../../../components/Navigation";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";
import { GOT_1_BONUS_POINTS } from "../../../constants";
import {
  loadStudentsAndBonuses,
  getOverallBonuses,
  updateStudentsAndBonuses,
} from "../home/homeSlice";
import OverallBonusesView from "./OverallBonusesView";

function OverallBonuses() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const studentsBonuses = useSelector(getOverallBonuses);
  const [loading, setLoading] = useState(false);

  const [checkedBonuses, setCheckedBonuses] = useState({
    checkedItems: new Map(),
  });

  const handleChange = (e) => {
    const studentId = e.target.getAttribute("row");
    const BonusesId = e.target.getAttribute("col");
    const isChecked = e.target.checked;

    setCheckedBonuses((prevState) => {
      let Bonuses = prevState.checkedItems.get(parseInt(studentId));
      Bonuses = Bonuses.map((el) => {
        if (el.BonusesId == BonusesId) return { ...el, isChecked };
        else return el;
      });

      return {
        // prettier-ignore
        checkedItems: prevState.checkedItems.set(parseInt(studentId), Bonuses),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const checkedItems = [];
    for (const [key, value] of checkedBonuses.checkedItems.entries()) {
      checkedItems.push({ student: { id: key }, Bonuses: value });
    }
    dispatch(updateStudentsAndBonuses(subjectId, checkedItems)).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    dispatch(loadStudentsAndBonuses(subjectId));
  }, []);

  useEffect(() => {
    if (studentsBonuses) {
      for (const studentBonuses of studentsBonuses) {
        const student = studentBonuses.student;
        const bonuses = [];
        for (const bonuses of studentBonuses.Bonuses) {
          bonuses.push({
            bonusesId: bonuses.id,
            isChecked: bonuses.got_point === GOT_1_BONUS_POINTS ? true : false,
          });
        }
        setCheckedBonuses((prevState) => ({
          checkedItems: prevState.checkedItems.set(
            parseInt(student.id),
            Bonuses
          ),
        }));
      }
    }
  }, [studentsBonuses]);

  return (
    <div>
      <Navigation />
      {showLoaderIfAnyNull(studentsBonuses) || (
        <OverallBonusesView
          studentsBonuses={studentsBonuses}
          checkedBonuses={checkedBonuses}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
}

export default OverallBonuses;
