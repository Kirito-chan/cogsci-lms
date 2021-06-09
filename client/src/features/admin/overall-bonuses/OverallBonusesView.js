import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import formatDate from "../../../components/utils/DateUtils";
import Button from "react-bootstrap/Button";
import {
  GOT_1_BONUS_POINTS,
  NOT_YET_COMMENTED,
  NOT_YET_EVALUATED_BONUS_POINTS,
  URL_ADMIN_STUDENT_DETAIL,
  URL_BONUSES,
} from "../../../constants";

import "./OverallBonusesView.css";
import LoadingInButton from "../../../components/LoadingInButton";
import { Link } from "react-router-dom";

function OverallBonusesView({
  studentsBonuses,
  checkedBonuses,
  handleChange,
  handleSubmit,
  loading,
  subjectId,
}) {
  const hasStudents = studentsBonuses.length > 0;
  const hasStudentsAndBonuses =
    hasStudents &&
    studentsBonuses[0].bonuses &&
    studentsBonuses[0].bonuses.length > 0;
  const numOfBonuses = hasStudentsAndBonuses
    ? studentsBonuses[0].bonuses.length
    : 0;

  return (
    <Container fluid>
      {hasStudentsAndBonuses ? (
        <Form onSubmit={handleSubmit}>
          <Table bordered striped hover size="sm" className="text-center">
            <thead>
              <tr>
                <th className="align-middle">Bonus</th>
                {Array(numOfBonuses)
                  .fill(1)
                  .map((_, i) => (
                    <th key={i}>
                      {
                        <Link
                          to={
                            "/subject/" +
                            subjectId +
                            URL_BONUSES +
                            "/" +
                            studentsBonuses[0].bonuses[i].id
                          }
                          className="link"
                        >
                          {i + 1}.
                        </Link>
                      }
                    </th>
                  ))}
              </tr>
              <tr>
                <th className="align-middle">Dátum</th>
                {hasStudentsAndBonuses &&
                  studentsBonuses[0].bonuses.map((bonus) => (
                    <th key={bonus.id}>{formatDate(bonus.created)}.</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {studentsBonuses.map((studentBonus) => (
                <tr key={studentBonus.student.id}>
                  <td>
                    <Link
                      to={
                        "/subject/" +
                        subjectId +
                        URL_ADMIN_STUDENT_DETAIL +
                        "/" +
                        studentBonus.student.id
                      }
                      className="link"
                    >
                      {studentBonus.student.last_name}{" "}
                      {studentBonus.student.first_name}
                    </Link>
                  </td>

                  {Array(numOfBonuses)
                    .fill(1)
                    .map((_, j) => {
                      const initialized = checkedBonuses.checkedItems.get(
                        studentBonus.student.id
                      );
                      const isChecked = initialized
                        ? checkedBonuses.checkedItems.get(
                            studentBonus.student.id
                          )[j]?.isChecked
                        : "";
                      const commented = isChecked == NOT_YET_COMMENTED;
                      return (
                        <td key={j}>
                          <div>
                            <div>
                              <Form.Check
                                row={studentBonus.student.id}
                                col={studentBonus.bonuses[j].id}
                                type="checkbox"
                                className={commented ? "d-none" : "d-block"}
                              >
                                <Form.Check.Input
                                  row={studentBonus.student.id}
                                  col={studentBonus.bonuses[j].id}
                                  type="checkbox"
                                  onChange={handleChange}
                                  className="opacity-1"
                                  checked={
                                    isChecked == GOT_1_BONUS_POINTS
                                      ? true
                                      : false
                                  }
                                />
                              </Form.Check>
                              <div
                                className={
                                  "text-center " +
                                  (commented ? "d-block" : "d-none")
                                }
                              >
                                <span>nekomentoval</span>
                              </div>
                            </div>
                          </div>

                          {isChecked == NOT_YET_EVALUATED_BONUS_POINTS ? (
                            <div>
                              <p></p>
                              <p className="mb-0 font-weight-bold">
                                nehodnotené
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-right">
            <Button variant="success" type="submit">
              {loading ? <LoadingInButton /> : "Uložiť zmeny"}
            </Button>
          </div>
        </Form>
      ) : (
        <p className="text-center text-danger">
          Sprístupní sa, keď bude v predmete vytvorený aspoň 1 bonus a potvrdený
          aspoň 1 študent
        </p>
      )}
    </Container>
  );
}

export default OverallBonusesView;
