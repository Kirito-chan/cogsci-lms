import React from "react";
import Table from "react-bootstrap/Table";
import formatDate from "../../../../components/DateUtils";
import { FaCheck, FaTimes } from "react-icons/fa";
import InputPassword from "./InputPassword";

export default function AttendanceTable({ attendances }) {
  return (
    <div>
      <h2>Dochádzka</h2>
      <Table bordered striped hover size="sm" className="text-center">
        <thead>
          <tr>
            <th>Týždeň</th>
            <th>Dátum</th>
            <th>Body</th>
            <th>Heslo</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((data, i) => (
            <tr key={i}>
              <td>{attendances.length - i}</td>
              <td>{formatDate(data.date)}</td>
              <td>{data.got_point}</td>
              <td>
                {data.got_point ? (
                  <FaCheck />
                ) : data.show_password_input ? (
                  <InputPassword />
                ) : (
                  <FaTimes />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
