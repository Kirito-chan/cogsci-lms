import React, { useEffect, useState } from "react";
import ResetedPasswordView from "./ResetedPasswordView";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  checkExpiration,
  getExpirationError,
  getFullName,
  getUsername,
  updatePassword,
  getPasswordUpdateError,
} from "./resetPasswordSlice";
import { showLoaderIfAnyNull } from "../../components/utils/StringUtils";
import Navigation from "../../components/navigations/Navigation";
import { Link } from "react-router-dom";
import { URL_LOGIN } from "../../constants";

function ResetedPasswordPage() {
  const { userId, token } = useParams();
  const dispatch = useDispatch();

  const username = useSelector(getUsername);
  const userFullName = useSelector(getFullName);
  const expirationError = useSelector(getExpirationError);
  const passwordUpdateError = useSelector(getPasswordUpdateError);

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (userId && token) {
      dispatch(checkExpiration(userId, token));
    }
  }, [userId, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(userId, token, password)).then((res) => {
      if (res) {
        setSuccess(
          <p className="mt-3">
            Heslo zmenené, môžete sa <Link to={URL_LOGIN}>prihlásiť</Link>
          </p>
        );
      }
    });
  };

  return (
    <div>
      <Navigation />
      {expirationError && (
        <h4 className="text-center text-danger">{expirationError}</h4>
      )}

      {expirationError
        ? ""
        : showLoaderIfAnyNull(username) || (
            <ResetedPasswordView
              username={username}
              userFullName={userFullName}
              setPassword={setPassword}
              setPasswordAgain={setPasswordAgain}
              password={password}
              passwordAgain={passwordAgain}
              handleSubmit={handleSubmit}
              success={success}
              passwordUpdateError={passwordUpdateError}
            />
          )}
    </div>
  );
}

export default ResetedPasswordPage;
