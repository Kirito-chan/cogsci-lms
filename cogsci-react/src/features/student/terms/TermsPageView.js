import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Navigation from "../../../components/navigations/Navigation";

function TermsPageView({ subjectValuation }) {
  return (
    <div>
      <Navigation />
      <Container fluid>
        <Row>
          <Col>
            <h2 className="text-center mb-5">Podmienky predmetu</h2>
          </Col>
        </Row>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Table bordered striped hover size="sm" className="text-center">
              <thead>
                <tr>
                  <th>Známka</th>
                  <th>Percentá</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A</td>
                  <td>
                    &lt;{subjectValuation.A}, {subjectValuation.B}&gt;
                  </td>
                </tr>
                <tr>
                  <td>B</td>
                  <td>
                    ({subjectValuation.B}, {subjectValuation.C}&gt;
                  </td>
                </tr>
                <tr>
                  <td>C</td>
                  <td>
                    ({subjectValuation.C}, {subjectValuation.D}&gt;
                  </td>
                </tr>
                <tr>
                  <td>D</td>
                  <td>
                    ({subjectValuation.D}, {subjectValuation.E}&gt;
                  </td>
                </tr>
                <tr>
                  <td>E</td>
                  <td>
                    ({subjectValuation.E}, {subjectValuation.Fx}&gt;
                  </td>
                </tr>
                <tr>
                  <td>Fx</td>
                  <td>({subjectValuation.Fx}, 0&gt;</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default TermsPageView;
