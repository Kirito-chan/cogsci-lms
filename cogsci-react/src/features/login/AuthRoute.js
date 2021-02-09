import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import {
  getToken,
  clearToken,
  checkToken,
  getError,
  getCurrentUserId,
  loadUserAndToken,
} from "../../app/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jwt-decode";

const AuthRoute = (props) => {
  const [component, setComponent] = useState(<div></div>);
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  let token = useSelector(getToken);
  const error = useSelector(getError);

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
      if (!error) {
        dispatch(checkToken(token));
        localStorage.setItem("token", token);

        if (props.type === "login") {
          setComponent(<Redirect to="/subjects" />);
        } else {
          setComponent(<Route {...props} />);
        }
      } else {
        clearTokens();
        if (props.type === "login") {
          setComponent(<Route {...props} />);
        } else {
          setComponent(<Redirect to="/login" />);
        }
      }
    } else {
      if (props.type === "login") {
        setComponent(<Route {...props} />);
      } else {
        setComponent(<Redirect to="/login" />);
      }
    }
  }, [props.type, token, error]);

  return component;
};

export default AuthRoute;
