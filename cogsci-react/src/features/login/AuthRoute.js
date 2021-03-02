import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import {
  getToken,
  clearToken,
  checkToken,
  getTokenError,
  getCurrentUserId,
  loadUserAndToken,
} from "../../app/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";
import { URL_SUBJECTS } from "../../constants";

const AuthRoute = (props) => {
  const [component, setComponent] = useState(<div></div>);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  let token = useSelector(getToken);
  const tokenError = useSelector(getTokenError);
  const log = false;

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
      if (!tokenError) {
        dispatch(checkToken(token));
        localStorage.setItem("token", token);
        if (log) console.log("tu som0");

        if (props.type === "login") {
          setComponent(<Redirect to={URL_SUBJECTS} />);
          if (log) console.log("tu som1");
        } else {
          setComponent(<Route {...props} />);
          if (log) console.log("tu som2");
        }
      } else {
        clearTokens();
        if (log) console.log("tu som3");
        setComponent(<Redirect to="/login" />);
      }
    } else {
      if (props.type === "login") {
        if (log) console.log("tu som4");
        setComponent(<Route {...props} />);
        history.push("/login");
      } else {
        setComponent(<Redirect to="/login" />);
        if (log) console.log("tu som5");
      }
    }
  }, [props.component, token, tokenError]);

  return component;
};

export default AuthRoute;
