import React, { useEffect, useState } from "react";
import Navigation from "../navigations/Navigation";
import ProfileChangeView from "./ProfileChangeView";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserEmail,
  getCurrentUserId,
  getCurrentUsername,
  getCurrentFirstName,
  getCurrentLastName,
  loadUserAndTokenWithToken,
} from "../../app/currentUserSlice";
import { getError, updateUserProfile } from "./profileChangeSlice";

function ProfileChangePage() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const currentUserEmail = useSelector(getCurrentUserEmail);
  const currentUsername = useSelector(getCurrentUsername);
  const currentUserFirstName = useSelector(getCurrentFirstName);
  const currentUserLastName = useSelector(getCurrentLastName);

  const error = useSelector(getError);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState("d-none");

  useEffect(() => {
    if (
      currentUserEmail &&
      currentUsername &&
      currentUserFirstName &&
      currentUserLastName
    ) {
      setFirstName(currentUserFirstName);
      setLastName(currentUserLastName);
      setUsername(currentUsername);
      setEmail(currentUserEmail);
    }
  }, [currentUserEmail]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      updateUserProfile(
        currentUserId,
        firstName,
        lastName,
        username,
        oldPassword,
        password,
        passwordAgain,
        email
      )
    ).then((res) => {
      if (res) {
        setShowSuccessMessage("d-block");
        dispatch(loadUserAndTokenWithToken());
      }
    });
  };
  return (
    <div>
      <Navigation />
      <ProfileChangeView
        handleSubmit={handleSubmit}
        firstName={firstName}
        lastName={lastName}
        username={username}
        email={email}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setUsername={setUsername}
        setPassword={setPassword}
        setEmail={setEmail}
        setPasswordAgain={setPasswordAgain}
        setOldPassword={setOldPassword}
        oldPassword={oldPassword}
        password={password}
        passwordAgain={passwordAgain}
        error={error}
        showSuccessMessage={showSuccessMessage}
      />
    </div>
  );
}

export default ProfileChangePage;
