import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import {
  getToken,
  clearToken,
  checkToken,
  getTokenError,
  getCurrentUserId,
  loadUserAndToken,
  getIsAdmin,
} from "../../app/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";
import { URL_ADMIN_SUBJECTS, URL_SUBJECTS } from "../../constants";

const AuthRoute = (props) => {
  const [component, setComponent] = useState(<div></div>);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const isAdmin = useSelector(getIsAdmin);
  let token = useSelector(getToken);
  const tokenError = useSelector(getTokenError);

  if (!token) {
    token = localStorage.getItem("token");
  }

  const clearTokens = () => {
    localStorage.clear();
    dispatch(clearToken());
  };

  // stara sa o to, aby pri refreshnuti stranky sa vzdy nacital token, userId a userName do Reduxu
  // kedze refresh vyprazdnuje Redux, tak to treba vratit do reduxu
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!currentUserId && token) {
      const user = jwt(token);
      dispatch(loadUserAndToken(user.username, user.password));
    }
  }, [currentUserId]);

  useEffect(() => {
    if (token) {
      if (tokenError === null) {
        dispatch(checkToken(token));
        localStorage.setItem("token", token);

        if (props.type === "login") {
          if (isAdmin === true) {
            setComponent(<Redirect to={URL_ADMIN_SUBJECTS} />);
          } else {
            setComponent(<Redirect to={URL_SUBJECTS} />);
          }
        } else {
          if (
            (isAdmin === false && props.type === "admin") ||
            (isAdmin === true && props.type === "student")
          ) {
            setComponent(<Redirect to="/not-authorized" />);
          } else {
            setComponent(<Route {...props} />);
          }
        }
      } else {
        clearTokens();
        setComponent(<Redirect to="/login" />);
        window.location.reload();
      }
    } else {
      if (props.type === "login") {
        setComponent(<Route {...props} />);
        history.push("/login");
      } else if (props.type === "register") {
        setComponent(<Route {...props} />);
      } else {
        setComponent(<Redirect to="/login" />);
      }
    }
  }, [props.component, token, tokenError]);

  return component;
};

export default AuthRoute;
