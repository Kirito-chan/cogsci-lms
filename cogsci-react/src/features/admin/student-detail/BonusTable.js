import React from "react";
import Table from "react-bootstrap/Table";

import { FaCheck, FaTimes } from "react-icons/fa";
import formatDate from "../../../components/DateUtils";
import { GOT_0_BONUS_POINTS, GOT_1_BONUS_POINTS } from "../../../constants";

export default function bonusTable({ bonuses }) {
  return (
    <div>
      <h2>Bonusové úlohy</h2>

      <Table bordered striped hover size="sm" className="text-center">
        <thead>
          <tr>
            <th>Týždeň</th>
            <th>Dátum</th>
            <th>Získal bod</th>
          </tr>
        </thead>
        <tbody>
          {bonuses.map((bonus, i) => (
            <tr key={i}>
              <td>{bonuses.length - i}</td>
              <td>{formatDate(bonus.created)}</td>
              <td>
                {bonus.evaluation == GOT_1_BONUS_POINTS ? (
                  <FaCheck />
                ) : bonus.evaluation == GOT_0_BONUS_POINTS ? (
                  <FaTimes />
                ) : (
                  "nehodnotené"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
