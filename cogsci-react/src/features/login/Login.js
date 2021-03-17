import React, { useState } from "react";
import "./Login.css";
import { getCustomError, loadUserAndToken } from "../../app/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginView from "./LoginView";

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
    <LoginView
      error={error}
      setUsername={setUsername}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
}

export default Login;
