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

const AuthRoute = (props) => {
  const [component, setComponent] = useState(<div></div>);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  let token = useSelector(getToken);
  const checkTokenError = useSelector(getTokenError);

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
      if (!checkTokenError) {
        dispatch(checkToken(token));
        localStorage.setItem("token", token);

        if (props.type === "login") {
          setComponent(<Redirect to="/subjects" />);
        } else {
          setComponent(<Route {...props} />);
        }
      } else {
        clearTokens();
        setComponent(<Redirect to="/login" />);
      }
    } else {
      if (props.type === "login") {
        setComponent(<Route {...props} />);
        history.push("/login");
      } else {
        setComponent(<Redirect to="/login" />);
      }
    }
  }, [props.component, token, checkTokenError]);

  return component;
};

export default AuthRoute;
