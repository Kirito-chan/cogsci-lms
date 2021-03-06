import React from "react";
import Table from "react-bootstrap/Table";

import { FaCheck, FaTimes } from "react-icons/fa";
import formatDate from "../../../components/utils/DateUtils";
import {
  GOT_0_BONUS_POINTS,
  GOT_1_BONUS_POINTS,
  NOT_YET_COMMENTED,
} from "../../../constants";

export default function BonusTable({ bonuses }) {
  return (
    <div>
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
                ) : bonus.evaluation == NOT_YET_COMMENTED ? (
                  "nekomentoval"
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
