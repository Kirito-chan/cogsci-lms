import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TextInputSettings } from "../../../../components/FormComponents";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateInputStyle from "./DateInputStyle";

function AddAttendanceView({
  handleSubmit,
  password,
  handlePassword,
  date,
  setDate,
}) {
  return (
    <div className="mt-4 mb-5 border border-dark rounded p-3">
      <h4>Pridanie novej dochádzky</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Label column sm="3">
            <b>Vyber dátum</b>
          </Form.Label>
          <Col sm="4">
            <DatePicker
              dateFormat="dd. MM. yyyy"
              selected={date}
              onChange={(selectedDate) => setDate(selectedDate)}
              customInput={<DateInputStyle />}
            />
          </Col>
        </Row>

        {/* <TextInputSettings title="Dátum" /> */}
        <TextInputSettings
          title="Zadaj heslo"
          content={password}
          handleContent={handlePassword}
          sm={["3", "4"]}
        />
        <Row>
          <Col sm="2"></Col>
          <Col sm="5" className="text-right">
            <Button variant="success" size="sm" type="submit">
              Pridať dochádzku
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddAttendanceView;
