import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
  TextInputRegistration,
  TextInputRegistrationNoRequired,
} from "../FormComponents";

import {
  DIFFERENT_PASSWORD_ERROR,
  SHORT_PASSWORD_ERROR,
  MINIMAL_PASSWORD_LENGTH,
} from "../../constants";
import { isValidEmail } from "../utils/StringUtils";
import { clearError } from "./profileChangeSlice";

function ProfileChangeView({
  firstName,
  lastName,
  username,
  setFirstName,
  setLastName,
  setUsername,
  setPassword,
  setPasswordAgain,
  setOldPassword,
  setEmail,
  oldPassword,
  password,
  passwordAgain,
  email,
  handleSubmit,
  error,
  showSuccessMessage,
}) {
  const emailError = "Zadali ste email v nesprávnom formáte !";

  return (
    <div>
      <h1 className="text-center mb-5">Úprava profilu</h1>
      <Container>
        <Row>
          <Col></Col>
          <Col md="9">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <TextInputRegistration
                  title="Meno"
                  autoComplete="given-name"
                  content={firstName}
                  setContent={setFirstName}
                />
                <TextInputRegistration
                  title="Priezvisko"
                  autoComplete="family-name"
                  setContent={setLastName}
                  content={lastName}
                />

                <TextInputRegistration
                  title="Email"
                  type="email"
                  autoComplete="email"
                  isInvalid={
                    !isValidEmail(email) || Boolean(error?.includes("email"))
                  }
                  error={error ? error : emailError}
                  setContent={setEmail}
                  clearError={clearError}
                  content={email}
                />

                <TextInputRegistration
                  title="Prihlasovacie meno"
                  isInvalid={Boolean(error?.includes("meno"))}
                  error={error}
                  clearError={clearError}
                  content={username}
                  setContent={setUsername}
                />

                <TextInputRegistration
                  title="Staré heslo"
                  type="password"
                  autoComplete="new-password"
                  content={oldPassword}
                  setContent={setOldPassword}
                  isInvalid={Boolean(error?.includes("heslo"))}
                  error={error}
                  clearError={clearError}
                />

                <TextInputRegistrationNoRequired
                  title="Nové heslo"
                  type="password"
                  autoComplete="new-password"
                  content={password}
                  setContent={setPassword}
                  isInvalid={
                    password?.length > 0 &&
                    password?.length < MINIMAL_PASSWORD_LENGTH
                  }
                  error={SHORT_PASSWORD_ERROR}
                />

                <TextInputRegistrationNoRequired
                  title="Nové heslo znovu"
                  type="password"
                  content={passwordAgain}
                  setContent={setPasswordAgain}
                  isInvalid={password !== passwordAgain}
                  error={DIFFERENT_PASSWORD_ERROR}
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="success" type="submit">
                  Uložiť zmeny
                </Button>
              </div>
              <p
                className={
                  showSuccessMessage + " text-success text-center mt-3"
                }
              >
                Úspešne uložené !
              </p>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileChangeView;
