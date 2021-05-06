import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetError, resetPassword } from "./resetPasswordSlice";
import Navigation from "../../components/navigations/Navigation";
import ForgottenPasswordView from "./ForgottenPasswordView";

function ForgottenPasswordPage() {
  const [email, setEmail] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const error = useSelector(getPasswordResetError);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email)).then((res) => {
      if (res) {
        setErrorMessage("");
        setSuccessMessage(
          "Link na obnovenie hesla bol úspešne poslaný na zadaný email !"
        );
      }
    });
  };

  useEffect(() => {
    if (error) {
      setSuccessMessage("");
      setErrorMessage(error);
    }
  }, [error]);

  return (
    <div>
      <Navigation />
      <ForgottenPasswordView
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default ForgottenPasswordPage;
