import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Attendance.css";
import { getAttendance, loadAttendance } from "../homeSlice";
import AttendanceTable from "./AttendanceTable";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/utils/StringUtils";

export default function Attendance() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const attendances = useSelector(getAttendance);

  useEffect(() => {
    if (subjectId) {
      dispatch(loadAttendance(subjectId));
    }
  }, [subjectId]);

  return (
    <div>
      <h2>Dochádzka</h2>
      {showLoaderIfAnyNull(attendances) || (
        <AttendanceTable attendances={attendances} />
      )}
    </div>
  );
}
