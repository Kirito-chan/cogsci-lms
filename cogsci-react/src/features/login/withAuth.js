/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { getToken } from "../../app/currentUserSlice";

export default function withAuth(ComponentToProtect) {
  return function HOC() {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(true);
    const token = useSelector(getToken);

    useEffect(() => {
      console.log("idem urobit checkToken preeed");
      if (token) {
        console.log("idem urobit checkToken " + token);
        const fetchData = async () => {
          try {
            const response = await axios.post(
              "http://localhost:8080/api/checkToken",
              {
                token: token,
              }
            );
            setLoading(false);
            console.log(response);
          } catch (error) {
            console.log(error);
            setLoading(false);
            setRedirect(true);
          }
        };
        fetchData();
      } else {
        setRedirect(true);
      }
    }, []);

    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return <ComponentToProtect />;
  };
}
