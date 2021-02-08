import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { getToken, clearToken } from "../../app/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const AuthRoute = (props) => {
  const [component, setComponent] = useState(<div></div>);
  const dispatch = useDispatch();
  let token = useSelector(getToken);

  if (!token) {
    token = localStorage.getItem("token");
  }

  const clearTokens = () => {
    localStorage.clear();
    dispatch(clearToken());
  };

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          // prettier-ignore
          await axios.post("http://localhost:8080/api/checkToken",{ token: token});
          localStorage.setItem("token", token);

          if (props.type === "login") {
            setComponent(<Redirect to="/subjects" />);
          } else {
            setComponent(<Route {...props} />);
          }
        } catch (error) {
          clearTokens();
          if (props.type === "login") {
            setComponent(<Route {...props} />);
          } else {
            setComponent(<Redirect to="/login" />);
          }
        }
      };
      fetchData();
    } else {
      if (props.type === "login") {
        setComponent(<Route {...props} />);
      } else {
        setComponent(<Redirect to="/login" />);
      }
    }
  }, [props.type, token]);

  return component;
};

export default AuthRoute;
