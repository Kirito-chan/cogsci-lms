import React from "react";
import { useSelector } from "react-redux";
import {
  getToken,
  getCurrentUserName,
  getIsAdmin,
} from "../app/currentUserSlice";
import "./Navigation.css";
import NavigationLoggedIn from "./NavigationLoggedIn";
import NavigationLoggedOut from "./NavigationLoggedOut";

function Navigation() {
  const loggedIn = useSelector(getToken);
  const currenUserName = useSelector(getCurrentUserName);
  const isAdmin = useSelector(getIsAdmin);

  return (
    <div>
      {loggedIn ? (
        <NavigationLoggedIn
          currentUserName={currenUserName}
          isAdmin={isAdmin}
        />
      ) : (
        <NavigationLoggedOut />
      )}
    </div>
  );
}

export default Navigation;
