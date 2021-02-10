import React from "react";
import { useSelector } from "react-redux";
import { getToken, getCurrentUserName } from "../app/currentUserSlice";
import "./Navigation.css";
import NavigationLoggedIn from "./NavigationLoggedIn";
import NavigationLoggedOut from "./NavigationLoggedOut";

function Navigation() {
  const loggedIn = useSelector(getToken);
  const currenUserName = useSelector(getCurrentUserName);

  return (
    <div>
      {loggedIn ? (
        <NavigationLoggedIn currentUserName={currenUserName} />
      ) : (
        <NavigationLoggedOut />
      )}
    </div>
  );
}

export default Navigation;
