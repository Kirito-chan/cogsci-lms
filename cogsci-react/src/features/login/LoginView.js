import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/Navigation";

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
            isInvalid={Boolean(error.includes("meno"))}
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
            isInvalid={Boolean(error.includes("heslo"))}
            autoComplete="current-password"
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Prihlásiť
        </Button>
      </Form>
    </div>
  );
}

export default LoginView;
