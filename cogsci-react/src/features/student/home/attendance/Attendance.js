import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Attendance.css";
import { getAttendance, loadAttendance } from "../homeSlice";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import AttendanceTable from "./AttendanceTable";
import { useParams } from "react-router";
import { showLoaderIfNull } from "../../../../components/StringUtils";

export default function Attendance() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const currentUserId = useSelector(getCurrentUserId);
  const attendances = useSelector(getAttendance);

  useEffect(() => {
    if (currentUserId && subjectId) {
      dispatch(loadAttendance(currentUserId, subjectId));
    }
  }, [currentUserId, subjectId]);

  return (
    showLoaderIfNull(attendances) || (
      <AttendanceTable attendances={attendances} />
    )
  );
}
