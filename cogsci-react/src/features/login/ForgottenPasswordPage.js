import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../app/currentUserSlice";
import Navigation from "../../components/Navigation";
import ForgottenPasswordView from "./ForgottenPasswordView";

function ForgottenPasswordPage() {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  return (
    <div>
      <Navigation />
      <ForgottenPasswordView handleSubmit={handleSubmit} setEmail={setEmail} />
    </div>
  );
}

export default ForgottenPasswordPage;
