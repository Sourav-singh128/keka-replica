import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const state = useSelector((state) => state.login);
  console.log("state ", state);
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token"));
  console.log("token ", token);
  console.log("state ", state);
  useEffect(() => {
    // if (!state?.username) {
    //   navigate("/login");
    // }
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
  });

  return <>{state?.username && children}</>;
};

export default Protected;
