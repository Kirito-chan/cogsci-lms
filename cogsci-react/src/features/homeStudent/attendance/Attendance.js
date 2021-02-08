import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Attendance.css";
import { getAttendance, loadAttendance } from "../homeStudentSlice";
import {
  getCurrentUserId,
  loadUserAndToken,
} from "../../../app/currentUserSlice";
import AttendanceTable from "./AttendanceTable";
import jwt from "jwt-decode";

export default function Attendance() {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId);
  const attendances = useSelector(getAttendance);

  // preco som tento useEffect nemohol dat do StudentHomePage ? vraj sa porusuju nejake Hooks pravidla
  // vsade v Reduxe budem musiet vytvarat lastFetch premennu pre vsetko - atttendances, bonuses, presentations,...
  // radsej by som to furt tahal z databazy
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!currentUserId && token) {
      const user = jwt(token);
      dispatch(loadUserAndToken(user.username, user.password));
    }
  }, [currentUserId]);

  useEffect(() => {
    if (currentUserId) {
      dispatch(loadAttendance(currentUserId));
    }
  }, [currentUserId]);

  return <AttendanceTable attendances={attendances} />;
}
