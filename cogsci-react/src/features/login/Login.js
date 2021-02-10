import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { loadUserAndToken } from "../../app/currentUserSlice";
import { useDispatch } from "react-redux";
//import { useHistory } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  //const history = useHistory();

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
          placeholder="Meno"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Heslo</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Prihlásiť
      </Button>
    </Form>
  );
}

export default Login;
