import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Navigation from "../../../components/navigations/Navigation";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";
import {
  GOT_0_BONUS_POINTS,
  GOT_1_BONUS_POINTS,
  NOT_YET_COMMENTED,
  NOT_YET_EVALUATED_BONUS_POINTS,
} from "../../../constants";
import { loadComments } from "../../student/bonus/bonusSlice";

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
    const studentId = e.currentTarget.getAttribute("row");
    const bonusId = e.currentTarget.getAttribute("col");
    const isChecked = e.currentTarget.checked
      ? GOT_1_BONUS_POINTS
      : GOT_0_BONUS_POINTS;

    setCheckedBonuses((prevState) => {
      let bonuses = prevState.checkedItems.get(parseInt(studentId));
      bonuses = bonuses.map((el) => {
        if (el.bonusId == bonusId) return { ...el, isChecked };
        else return el;
      });

      return {
        // prettier-ignore
        checkedItems: prevState.checkedItems.set(parseInt(studentId), bonuses),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const checkedItems = [];
    for (const [key, value] of checkedBonuses.checkedItems.entries()) {
      checkedItems.push({ student: { id: key }, bonuses: value });
    }
    dispatch(updateStudentsAndBonuses(subjectId, checkedItems)).then(() => {
      for (let i = 0; i < checkedItems[0].bonuses.length; i++) {
        dispatch(loadComments(checkedItems[0].bonuses[i].bonusId, subjectId));
      }

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
        for (const bonus of studentBonuses.bonuses) {
          bonuses.push({
            bonusId: bonus.id,
            isChecked:
              bonus.got_point == NOT_YET_EVALUATED_BONUS_POINTS ||
              bonus.got_point == NOT_YET_COMMENTED
                ? bonus.got_point
                : parseInt(bonus.got_point),
          });
        }

        setCheckedBonuses((prevState) => ({
          checkedItems: prevState.checkedItems.set(
            parseInt(student.id),
            bonuses
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
          subjectId={subjectId}
        />
      )}
    </div>
  );
}

export default OverallBonuses;
