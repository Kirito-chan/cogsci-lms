import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Attendance.css";
import { getBonuses, loadBonuses } from "./studentDetailSlice";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";
import BonusTable from "./BonusTable";

export default function Bonus({ student }) {
  const dispatch = useDispatch();
  const bonuses = useSelector(getBonuses);
  const { subjectId } = useParams();

  useEffect(() => {
    if (student && subjectId) {
      dispatch(loadBonuses(student.id, subjectId));
    }
  }, [student, subjectId]);

  return (
    <div>
      <h2>Bonusové úlohy</h2>
      {showLoaderIfAnyNull(bonuses) || <BonusTable bonuses={bonuses} />}
    </div>
  );
}
