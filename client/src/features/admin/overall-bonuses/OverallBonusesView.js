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
} from "../../../constants";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import "./OverallBonusesView.css";

function OverallBonusesView({
  studentsBonuses,
  checkedBonuses,
  handleChange,
  handleSubmit,
  loading,
  handleToggleOff,
  handleToggleOn,
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
                <th>Bonus</th>
                {Array(numOfBonuses)
                  .fill(1)
                  .map((_, i) => (
                    <th key={i}>{i + 1}.</th>
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
                    {studentBonus.student.last_name}{" "}
                    {studentBonus.student.first_name}
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
                          )[j].isChecked
                        : "";
                      const commented = isChecked == NOT_YET_COMMENTED;
                      return (
                        <td key={j}>
                          <div
                            className={
                              !commented
                                ? "d-flex justify-content-between pl-5"
                                : ""
                            }
                          >
                            <Form.Check
                              row={studentBonus.student.id}
                              col={studentBonus.bonuses[j].id}
                              type="checkbox"
                              className={
                                commented ? "d-none" : "d-inline-block"
                              }
                            >
                              <Form.Check.Input
                                row={studentBonus.student.id}
                                col={studentBonus.bonuses[j].id}
                                type="checkbox"
                                onChange={handleChange}
                                disabled={
                                  isChecked == NOT_YET_EVALUATED_BONUS_POINTS
                                }
                                className="opacity-1"
                                checked={
                                  isChecked == GOT_1_BONUS_POINTS ? true : false
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

                            <span
                              className={
                                commented ? "d-none" : "d-inline-block"
                              }
                            >
                              <Button
                                variant="outline-success"
                                row={studentBonus.student.id}
                                col={studentBonus.bonuses[j].id}
                                className={
                                  "btn-xs " +
                                  (isChecked != NOT_YET_EVALUATED_BONUS_POINTS
                                    ? "d-inline-block"
                                    : "d-none")
                                }
                                onClick={handleToggleOn}
                              >
                                <FaToggleOn size={15} />
                              </Button>
                              <Button
                                variant="outline-danger"
                                row={studentBonus.student.id}
                                col={studentBonus.bonuses[j].id}
                                className={
                                  "btn-xs " +
                                  (isChecked == NOT_YET_EVALUATED_BONUS_POINTS
                                    ? "d-inline-block"
                                    : "d-none")
                                }
                                onClick={handleToggleOff}
                              >
                                <FaToggleOff size={15} />
                              </Button>
                            </span>
                          </div>
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-right">
            <Button variant="success" type="submit">
              {loading ? (
                <span>
                  <span className={"spinner-border spinner-border-sm "}></span>{" "}
                  Loading...
                </span>
              ) : (
                "Uložiť zmeny"
              )}
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
