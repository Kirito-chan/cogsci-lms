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
  const earnedAttendancePoints = attendances.filter((it) => it.got_point)
    .length;
  const maxAttendancePoints = attendances.length;
  const attendanceWeight = attendances[0]?.weight;
  const earnedBonusPoints = bonuses.filter((it) => it.evaluation == 1).length;
  const maxBonusPoints = bonuses.length;
  const bonusWeight = bonuses[0]?.weight;
  const bonusPointsFromWeight = Number(
    ((earnedBonusPoints / maxBonusPoints) * bonusWeight).toFixed(2)
  );
  const attendancePointsFromWeight = Number(
    ((earnedAttendancePoints / maxAttendancePoints) * attendanceWeight).toFixed(
      2
    )
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
              {presentationPoints} z {presentationWeight}
            </td>
            <td>{presentationPoints}</td>
            <td>{presentationWeight}</td>
          </tr>

          <tr>
            <td>Dochádzka</td>
            <td>
              {earnedAttendancePoints} z {maxAttendancePoints}
            </td>
            <td>{attendancePointsFromWeight}</td>
            <td>{attendanceWeight}</td>
          </tr>

          <tr>
            <td>Domáce úlohy</td>
            <td>
              {earnedBonusPoints} z {maxBonusPoints}
            </td>
            <td>{bonusPointsFromWeight}</td>
            <td>{bonusWeight}</td>
          </tr>

          <tr>
            <td>
              <strong>Spolu</strong>
            </td>
            <td colSpan="3">{sumOfPercents} %</td>
          </tr>
          <tr>
            <td>
              <strong>Známka</strong>
            </td>
            <td colSpan="3">
              <strong>{grade}</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
