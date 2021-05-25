import React from "react";
import Table from "react-bootstrap/Table";
import getGrade from "../../../../components/utils/Math";
import { NUM_OF_BONUSES_NOT_SET } from "../../../../constants";

export default function EvaluationTable({
  presentation,
  presentationWeight,
  attendanceWeight,
  commentsWeight,
  attendances,
  bonuses,
  subjectValuation,
  currentSubjectNumOfWeeks,
  currentSubjectNumOfBonuses,
}) {
  const presentationPoints = parseFloat(presentation?.points) || 0;
  // prettier-ignore
  const earnedAttendancePoints = attendances.filter((it) => it.got_point).length || 0;
  const maxAttendancePoints = currentSubjectNumOfWeeks;
  const earnedBonusPoints =
    bonuses.filter((it) => it.evaluation == 1).length || 0;
  const maxBonusPoints =
    currentSubjectNumOfBonuses === NUM_OF_BONUSES_NOT_SET
      ? bonuses.length
      : currentSubjectNumOfBonuses;
  const bonusPointsFromWeight =
    Number(
      ((earnedBonusPoints / maxBonusPoints) * commentsWeight).toFixed(2)
    ) || 0;
  // prettier-ignore
  const attendancePointsFromWeight = Number(
    ((earnedAttendancePoints / maxAttendancePoints) * attendanceWeight).toFixed(2)
  ) || 0;

  const sumOfPercents = parseFloat(
    (
      presentationPoints +
      attendancePointsFromWeight +
      bonusPointsFromWeight
    ).toFixed(2)
  );

  const grade = getGrade(sumOfPercents, subjectValuation);

  return (
    <div>
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
            <td>Bonusové úlohy</td>
            <td>
              {earnedBonusPoints} z {maxBonusPoints}
            </td>
            <td>{bonusPointsFromWeight}</td>
            <td>{commentsWeight}</td>
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
