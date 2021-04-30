import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { TextInputRegistration } from "../../components/FormComponents";
import { clearError } from "../../app/currentUserSlice";

function RegisterView({
  setFirstName,
  setLastName,
  setUsername,
  setPassword,
  setPasswordAgain,
  setEmail,
  password,
  passwordAgain,
  email,
  handleSubmit,
  error,
}) {
  const differentPasswordError = "Heslá sa nezhodujú !";
  const shortPasswordError = "Heslo musí mať aspoň 6 znakov !";
  const emailError = "Zadali ste email v nesprávnom formáte !";

  const isValidEmail = (email) => {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !email || emailPattern.test(String(email).toLowerCase());
  };

  return (
    <div>
      <h1 className="text-center mb-5">Registrácia</h1>
      <Container>
        <Row>
          <Col></Col>
          <Col md="9">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <TextInputRegistration
                  title="Meno"
                  setContent={setFirstName}
                  autoComplete="given-name"
                />
                <TextInputRegistration
                  title="Priezvisko"
                  autoComplete="family-name"
                  setContent={setLastName}
                />

                <TextInputRegistration
                  title="Prihlasovacie meno"
                  setContent={setUsername}
                  isInvalid={Boolean(error.includes("meno"))}
                  error={error}
                  clearError={clearError}
                />

                <TextInputRegistration
                  title="Heslo"
                  type="password"
                  autoComplete="new-password"
                  setContent={setPassword}
                  isInvalid={password?.length < 6}
                  error={shortPasswordError}
                />
                <TextInputRegistration
                  title="Zopakujte heslo"
                  type="password"
                  isInvalid={password !== passwordAgain}
                  error={differentPasswordError}
                  setContent={setPasswordAgain}
                />
                <TextInputRegistration
                  title="Email"
                  type="email"
                  autoComplete="email"
                  isInvalid={
                    !isValidEmail(email) || Boolean(error.includes("email"))
                  }
                  error={error ? error : emailError}
                  setContent={setEmail}
                  clearError={clearError}
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="success" type="submit">
                  Registrovať sa
                </Button>
              </div>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterView;
