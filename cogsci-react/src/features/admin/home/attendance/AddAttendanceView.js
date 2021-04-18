import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TextInputSettings } from "../../../../components/FormComponents";

function AddAttendanceView() {
  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="mt-4 mb-5">
      <h4>Pridanie novej dochádzky</h4>
      <Form>
        <TextInputSettings title="Dátum" />
        <TextInputSettings
          title="Heslo"
          content={password}
          handleContent={handlePassword}
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
