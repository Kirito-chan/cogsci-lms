import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addnewAttendance, loadAttendance } from "../homeSlice";
import AddAttendanceView from "./AddAttendanceView";

function AddAttendance() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const [password, setPassword] = useState("");
  const [date, setDate] = useState(new Date());

  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addnewAttendance(subjectId, date, password)).then(() => {
      dispatch(loadAttendance(subjectId));
    });
  };

  return (
    <AddAttendanceView
      handleSubmit={handleSubmit}
      date={date}
      setDate={setDate}
      password={password}
      handlePassword={handlePassword}
    />
  );
}

export default AddAttendance;
