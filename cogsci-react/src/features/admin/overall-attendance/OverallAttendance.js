import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Navigation from "../../../components/navigations/Navigation";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";
import {
  loadStudentsAndAttendance,
  getOverallAttendance,
  updateStudentsAndAttendance,
} from "../home/homeSlice";
import OverallAttendanceView from "./OverallAttendanceView";

function OverallAttendance() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const studentsAttendances = useSelector(getOverallAttendance);
  const [loading, setLoading] = useState(false);

  const [checkedAttendances, setCheckedAttendances] = useState({
    checkedItems: new Map(),
  });

  const handleChange = (e) => {
    const studentId = e.currentTarget.getAttribute("row");
    const attendanceId = e.currentTarget.getAttribute("col");
    const isChecked = e.currentTarget.checked;

    setCheckedAttendances((prevState) => {
      let attendances = prevState.checkedItems.get(parseInt(studentId));
      attendances = attendances.map((el) => {
        if (el.attendanceId == attendanceId) return { ...el, isChecked };
        else return el;
      });

      return {
        // prettier-ignore
        checkedItems: prevState.checkedItems.set(parseInt(studentId), attendances),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const checkedItems = [];
    for (const [key, value] of checkedAttendances.checkedItems.entries()) {
      checkedItems.push({ student: { id: key }, attendances: value });
    }
    dispatch(updateStudentsAndAttendance(subjectId, checkedItems)).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    dispatch(loadStudentsAndAttendance(subjectId));
  }, []);

  useEffect(() => {
    if (studentsAttendances) {
      for (const studentAttendances of studentsAttendances) {
        const student = studentAttendances.student;
        const attendances = [];
        for (const attendance of studentAttendances.attendances) {
          attendances.push({
            attendanceId: attendance.id,
            isChecked: attendance.got_point === 1 ? true : false,
          });
        }
        setCheckedAttendances((prevState) => ({
          checkedItems: prevState.checkedItems.set(
            parseInt(student.id),
            attendances
          ),
        }));
      }
    }
  }, [studentsAttendances]);

  return (
    <div>
      <Navigation />
      {showLoaderIfAnyNull(studentsAttendances) || (
        <OverallAttendanceView
          studentsAttendance={studentsAttendances}
          checkedAttendances={checkedAttendances}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
}

export default OverallAttendance;
