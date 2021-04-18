import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Attendance.css";
import { getAttendance, loadAttendance } from "../homeSlice";
import AttendanceTable from "./AttendanceTable";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../../components/StringUtils";

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
    showLoaderIfAnyNull(attendances) || (
      <AttendanceTable attendances={attendances} />
    )
  );
}
