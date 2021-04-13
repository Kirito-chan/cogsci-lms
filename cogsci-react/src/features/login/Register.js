import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomError, registerNewUser } from "../../app/currentUserSlice";
import Navigation from "../../components/Navigation";
import Login from "./Login";
import RegisterView from "./RegisterView";

function Register() {
  const dispatch = useDispatch();
  const error = useSelector(getCustomError);
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordAgain, setPasswordAgain] = useState();
  const [email, setEmail] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      registerNewUser(
        firstName,
        lastName,
        username,
        password,
        passwordAgain,
        email
      )
    ).then((res) => {
      if (res)
        setRegisterSuccessMessage(
          "Boli ste úspešne registrovaný, môžete sa prihlásiť !"
        );
    });
  };

  return (
    <div>
      <Navigation />
      {registerSuccessMessage ? (
        <Login registerMessage={registerSuccessMessage} />
      ) : (
        <RegisterView
          handleSubmit={handleSubmit}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setUsername={setUsername}
          setPassword={setPassword}
          setEmail={setEmail}
          setPasswordAgain={setPasswordAgain}
          password={password}
          passwordAgain={passwordAgain}
          email={email}
          error={error}
        />
      )}
    </div>
  );
}

export default Register;
