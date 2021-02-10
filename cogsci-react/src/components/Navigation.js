import React from "react";
import { useSelector } from "react-redux";
import { getToken, getCurrentUserName } from "../app/currentUserSlice";
import "./Navigation.css";
import NavigationLoggedIn from "./NavigationLoggedIn";
import NavigationLoggedOut from "./NavigationLoggedOut";
import { withRouter } from "react-router";

function Navigation(props) {
  // prettier-ignore
  const loggedIn = useSelector(getToken);
  const currenUserName = useSelector(getCurrentUserName);

  return (
    <div>
      {loggedIn ? (
        <NavigationLoggedIn {...props} currentUserName={currenUserName} />
      ) : (
        <NavigationLoggedOut {...props} />
      )}
    </div>
  );
}

const NavbarWithRouter = withRouter(Navigation);
export default NavbarWithRouter;
