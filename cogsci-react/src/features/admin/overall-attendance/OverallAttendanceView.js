import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import formatDate from "../../../components/utils/DateUtils";
import Button from "react-bootstrap/Button";

function OverallAttendanceView({
  studentsAttendance,
  checkedAttendances,
  handleChange,
  handleSubmit,
  loading,
}) {
  const hasStudents = studentsAttendance.length > 0;
  const hasStudentsAndAttendances =
    hasStudents && studentsAttendance[0].attendances?.length > 0;
  const numOfAttendances = hasStudentsAndAttendances
    ? studentsAttendance[0].attendances?.length
    : 0;

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Table bordered striped hover size="sm" className="text-center">
          <thead>
            <tr>
              <th>Prednáška</th>
              {Array(numOfAttendances)
                .fill(1)
                .map((_, i) => (
                  <th key={i}>{i + 1}.</th>
                ))}
            </tr>
            <tr>
              <th className="align-middle">Dátum</th>
              {hasStudentsAndAttendances &&
                studentsAttendance[0].attendances.map((attendance) => (
                  <th key={attendance.id}>{formatDate(attendance.date)}.</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {studentsAttendance.map((studentAttendance) => (
              <tr key={studentAttendance.student.id}>
                <td>
                  {studentAttendance.student.last_name}{" "}
                  {studentAttendance.student.first_name}
                </td>

                {Array(numOfAttendances)
                  .fill(1)
                  .map((_, j) => (
                    <td key={j}>
                      <Form.Check
                        row={studentAttendance.student.id}
                        col={studentAttendance.attendances[j].id}
                        type="checkbox"
                      >
                        <Form.Check.Input
                          row={studentAttendance.student.id}
                          col={studentAttendance.attendances[j].id}
                          type="checkbox"
                          onChange={handleChange}
                          checked={
                            checkedAttendances.checkedItems.get(
                              studentAttendance.student.id
                            )
                              ? checkedAttendances.checkedItems.get(
                                  studentAttendance.student.id
                                )[j].isChecked
                              : false
                          }
                        />
                      </Form.Check>
                    </td>
                  ))}
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
    </Container>
  );
}

export default OverallAttendanceView;
