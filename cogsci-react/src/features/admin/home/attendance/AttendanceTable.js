import React from "react";
import Table from "react-bootstrap/Table";
import formatDate from "../../../../components/DateUtils";
import { FaCheck } from "react-icons/fa";
import LockAttendance from "./LockAttendance";
import { ATTENDANCE_CLOSED, ATTENDANCE_OPENED } from "../../../../constants";
import AddAttendance from "./AddAttendance";

export default function AttendanceTable({ attendances }) {
  const allLocked =
    attendances.filter((attendance) => attendance.status == ATTENDANCE_OPENED)
      .length === 0;
  return (
    <div>
      <h2>Dochádzka</h2>
      {allLocked ? <AddAttendance /> : ""}

      <Table bordered striped hover size="sm" className="text-center">
        <thead>
          <tr>
            <th>Týždeň</th>
            <th>Dátum</th>
            <th>Uzamknutie dochádzky</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance, i) => (
            <tr key={i}>
              <td>{attendances.length - i}</td>
              <td>{formatDate(attendance.date)}</td>
              <td>
                {attendance.status == ATTENDANCE_CLOSED ? (
                  <FaCheck />
                ) : (
                  <LockAttendance attendanceId={attendance.id} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
