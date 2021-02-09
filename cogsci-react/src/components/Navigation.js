import React from "react";
import { useSelector } from "react-redux";
import { getToken } from "../app/currentUserSlice";
import "./Navigation.css";
import NavigationLoggedIn from "./NavigationLoggedIn";
import NavigationLoggedOut from "./NavigationLoggedOut";
import { withRouter } from "react-router";

function Navigation(props) {
  // prettier-ignore
  const loggedIn = useSelector(getToken);

  return (
    <div>
      {loggedIn ? (
        <NavigationLoggedIn {...props} />
      ) : (
        <NavigationLoggedOut {...props} />
      )}
    </div>
  );
}

const NavbarWithRouter = withRouter(Navigation);
export default NavbarWithRouter;
