import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Attendance.css";
import { getAttendance, loadAttendance } from "./studentDetailSlice";
import AttendanceTable from "../home/attendance/AttendanceTable";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";

export default function Attendance({ student }) {
  const dispatch = useDispatch();
  const attendances = useSelector(getAttendance);
  const { subjectId } = useParams();

  useEffect(() => {
    if (student && subjectId) {
      dispatch(loadAttendance(student.id, subjectId));
    }
  }, [student, subjectId]);

  return (
    <div>
      <h2>Dochádzka</h2>
      {showLoaderIfAnyNull(attendances) || (
        <AttendanceTable attendances={attendances} detail={true} />
      )}
    </div>
  );
}
