import React, { useState } from "react";
import "./LoginRegistration.css";
import {
  getCustomError,
  loadUserAndTokenWithLogin,
} from "../../app/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginView from "./LoginView";
import { useHistory } from "react-router";

function Login({ registerMessage }) {
  const dispatch = useDispatch();
  const error = useSelector(getCustomError);
  const history = useHistory();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loadUserAndTokenWithLogin(username, password)).then(() => {
      if (registerMessage) history.push("/");
    });
  };

  return (
    <LoginView
      error={error}
      setUsername={setUsername}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      registerMessage={registerMessage}
    />
  );
}

export default Login;
