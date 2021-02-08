import React from "react";
import Table from "react-bootstrap/Table";
import getGrade from "../../../components/Math";

export default function EvaluationTable({
  presentation,
  attendances,
  bonuses,
  subjectValuation,
}) {
  const presentationPoints = parseFloat(presentation?.points);
  const presentationWeight = presentation?.weight;
  // prettier-ignore
  const earnedAttendancePoints = attendances.filter((it) => it.got_point).length;
  const maxAttendancePoints = attendances.length;
  const attendanceWeight = attendances[0]?.weight;
  const earnedBonusPoints = bonuses.filter((it) => it.evaluation == 1).length;
  const maxBonusPoints = bonuses.length;
  const bonusWeight = bonuses[0]?.weight;
  const bonusPointsFromWeight = Number(
    ((earnedBonusPoints / maxBonusPoints) * bonusWeight).toFixed(2)
  );
  // prettier-ignore
  const attendancePointsFromWeight = Number(
    ((earnedAttendancePoints / maxAttendancePoints) * attendanceWeight).toFixed(2)
  );

  const sumOfPercents = parseFloat(
    (
      presentationPoints +
      attendancePointsFromWeight +
      bonusPointsFromWeight
    ).toFixed(2)
  );

  const grade = getGrade(sumOfPercents, subjectValuation);

  return (
    <div className="mt-5">
      <h2>Celkové hodnotenie</h2>
      <Table bordered striped hover size="sm" className="text-center">
        <thead>
          <tr>
            <th>Kategórie</th>
            <th>Hodnotenie</th>
            <th>Body z váhy</th>
            <th>Váha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Prezentácia</td>
            <td>
              {presentationPoints || 0} z {presentationWeight || 0}
            </td>
            <td>{presentationPoints || 0}</td>
            <td>{presentationWeight || 0}</td>
          </tr>

          <tr>
            <td>Dochádzka</td>
            <td>
              {earnedAttendancePoints || 0} z {maxAttendancePoints || 0}
            </td>
            <td>{attendancePointsFromWeight || 0}</td>
            <td>{attendanceWeight || 0}</td>
          </tr>

          <tr>
            <td>Bonusové úlohy</td>
            <td>
              {earnedBonusPoints || 0} z {maxBonusPoints || 0}
            </td>
            <td>{bonusPointsFromWeight || 0}</td>
            <td>{bonusWeight || 0}</td>
          </tr>

          <tr>
            <td>
              <strong>Spolu</strong>
            </td>
            <td colSpan="3">{sumOfPercents || 0} %</td>
          </tr>
          <tr>
            <td>
              <strong>Známka</strong>
            </td>
            <td colSpan="3">
              <strong>{grade || 0}</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
