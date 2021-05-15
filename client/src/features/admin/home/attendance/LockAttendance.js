import React from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { ATTENDANCE_CLOSED } from "../../../../constants";
import { loadAttendance, updateAttendanceStatus } from "../homeSlice";
import { useParams } from "react-router";

function LockAttendance({ attendanceId }) {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const handleLockAttedance = () => {
    dispatch(
      updateAttendanceStatus(subjectId, attendanceId, ATTENDANCE_CLOSED)
    ).then(() => {
      dispatch(loadAttendance(subjectId));
    });
  };
  return (
    <div>
      <Button variant="danger" size="sm" onClick={handleLockAttedance}>
        Uzamknúť dochádzku
      </Button>
    </div>
  );
}

export default LockAttendance;
