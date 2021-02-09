import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Attendance.css";
import { getAttendance, loadAttendance } from "../homeStudentSlice";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import AttendanceTable from "./AttendanceTable";

export default function Attendance() {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId);
  const attendances = useSelector(getAttendance);

  // vsade v Reduxe budem musiet vytvarat lastFetch premennu pre vsetko - atttendances, bonuses, presentations,...
  // radsej by som to furt tahal z databazy

  useEffect(() => {
    dispatch(loadAttendance(currentUserId));
  }, [currentUserId]);

  return <AttendanceTable attendances={attendances} />;
}
