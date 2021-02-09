import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import {
  getToken,
  clearToken,
  checkToken,
  getError,
} from "../../app/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";

const AuthRoute = (props) => {
  const [component, setComponent] = useState(<div></div>);
  const dispatch = useDispatch();
  let token = useSelector(getToken);
  const error = useSelector(getError);

  if (!token) {
    token = localStorage.getItem("token");
  }

  const clearTokens = () => {
    localStorage.clear();
    dispatch(clearToken());
  };

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
