import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  addPasswordForAttendance,
  clearAttendancePasswordError,
  getAttendanceErrorPassword,
  loadAttendance,
} from "../homeSlice";
import InputPasswordView from "./InputPasswordView";
import { getCurrentUserId } from "../../../../app/currentUserSlice";

function InputPassword() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const currentUserId = useSelector(getCurrentUserId);
  const passwordError = useSelector(getAttendanceErrorPassword);

  const [password, setPassword] = useState("");

  const handlePassword = (e) => {
    dispatch(clearAttendancePasswordError());
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addPasswordForAttendance(currentUserId, subjectId, password)).then(
      () => {
        dispatch(loadAttendance(currentUserId, subjectId));
      }
    );
  };

  return (
    <InputPasswordView
      handleSubmit={handleSubmit}
      password={password}
      handlePassword={handlePassword}
      error={passwordError}
    />
  );
}

export default InputPassword;
