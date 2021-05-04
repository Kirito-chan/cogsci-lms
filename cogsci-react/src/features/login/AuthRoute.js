import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import {
  getToken,
  clearToken,
  checkToken,
  getTokenError,
  getCurrentUserId,
  getIsAdmin,
  loadUserAndTokenWithToken,
  getAnyError,
} from "../../app/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  URL_ADMIN_SUBJECTS,
  URL_LOGIN,
  URL_NOT_AUTHORIZED,
  URL_SUBJECTS,
} from "../../constants";
import { resetState } from "../../app/actions";

const AuthRoute = (props) => {
  const [component, setComponent] = useState(<div></div>);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const isAdmin = useSelector(getIsAdmin);
  let token = useSelector(getToken);
  const tokenError = useSelector(getTokenError);
  const authError = useSelector(getAnyError);

  if (!token) {
    token = localStorage.getItem("token");
  }

  const clearTokens = () => {
    localStorage.clear();
    dispatch(clearToken());
    dispatch(resetState());
  };

  // stara sa o to, aby pri refreshnuti stranky sa vzdy nacital token, userId a userName do Reduxu
  // kedze refresh vyprazdnuje Redux, tak to treba vratit do reduxu
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!currentUserId && token) {
      dispatch(loadUserAndTokenWithToken());
    }
  }, [currentUserId]);

  useEffect(() => {
    if (authError) {
      if (authError.includes("token")) history.push(URL_NOT_AUTHORIZED);
    }
  }, [authError]);

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
            (isAdmin === true && props.type === "student") ||
            props.type === "register"
          ) {
            setComponent(<Redirect to="/not-authorized" />);
          } else {
            setComponent(<Route {...props} />);
          }
        }
      } else {
        clearTokens();
        setComponent(<Redirect to={URL_LOGIN} />);
      }
    } else {
      if (props.type === "login") {
        setComponent(<Route {...props} />);
        history.push(URL_LOGIN);
      } else if (props.type === "register" || props.type === "not-auth") {
        setComponent(<Route {...props} />);
      } else {
        console.log(props);
        setComponent(<Redirect to={URL_LOGIN} />);
      }
    }
  }, [props.component, token, tokenError]);

  return component;
};

export default AuthRoute;
