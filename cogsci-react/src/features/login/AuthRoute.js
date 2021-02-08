import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { getToken, clearToken } from "../../app/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import SubjectsPage from "../subjects/SubjectsPage";
// import SubjectsPage from "../subjects/SubjectsPage";
// import StudentHomePage from "../homeStudent/StudentHomePage";

const AuthRoute = (props) => {
  const [component, setComponent] = useState(<div></div>);
  const dispatch = useDispatch();
  let token = useSelector(getToken);
  if (!token) {
    token = localStorage.getItem("token");
  }

  const clearTokensAndUnauthorize = () => {
    localStorage.removeItem("token");
    dispatch(clearToken());
  };

  useEffect(() => {
    console.log("idem urobit checkToken preeed " + token);
    if (token) {
      console.log("idem urobit checkToken " + token);

      const fetchData = async () => {
        try {
          // prettier-ignore
          const response = await axios.post("http://localhost:8080/api/checkToken",{ token: token});
          console.log("odpoved " + response + " status " + response.status);
          localStorage.setItem("token", token);

          if (props.type === "login") {
            setComponent(<Redirect to="/subjects" />);
          } else {
            setComponent(<Route {...props} />);
          }
        } catch (error) {
          clearTokensAndUnauthorize();
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

  // const { type } = props;

  // console.log(isAuthorized);

  // if (type === "guest" && isAuthorized) return <Redirect to="/subjects" />;
  // if (type === "private" && !isAuthorized) return <Redirect to="/login" />;

  // return <Route {...props} />;
  return component;
};

export default AuthRoute;
