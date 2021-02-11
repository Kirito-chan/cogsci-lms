import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { getCustomError, loadUserAndToken } from "../../app/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const error = useSelector(getCustomError);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loadUserAndToken(username, password));
  };

  return (
    <Form className="login-wrapper" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Prihlasovacie meno</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          isInvalid={Boolean(error.includes("meno"))}
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
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Prihlásiť
      </Button>
    </Form>
  );
}

export default Login;
