import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/navigations/Navigation";
import { Link } from "react-router-dom";
import { URL_FORGOTTEN_PASSWORD } from "../../constants";

function LoginView({
  error,
  setUsername,
  setPassword,
  handleSubmit,
  registerMessage,
}) {
  return (
    <div>
      <Navigation />
      <h1 className="text-center mb-5">Kognitívne vedy</h1>
      {registerMessage ? (
        <p className="text-success text-center">{registerMessage}</p>
      ) : (
        ""
      )}
      <Form className="wrapper" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Prihlasovacie meno</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={Boolean(error?.includes("meno"))}
            autoComplete="username"
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Heslo</Form.Label>
          <Form.Control
            type="password"
            placeholder="Heslo"
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={Boolean(error?.includes("heslo"))}
            autoComplete="current-password"
          />
          <Link to={URL_FORGOTTEN_PASSWORD}>Zabudli ste heslo?</Link>
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Prihlásiť
        </Button>
      </Form>

      <footer className="text-center bg-dark text-white wrapper w-100" style={ {position: "fixed", bottom: 0}}>
        <div className="text-center p-3">
          &copy; 2021 Copyright: František Kochjar
        </div>
      </footer>
    </div>
  );
}

export default LoginView;
