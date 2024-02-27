import React from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Profile = ({ item, link }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileHandler = (e) => {
    console.log("event-val ", e.target.innerHTML);
    if (e.target.innerHTML === "Logout") {
      sessionStorage.clear("token");
      dispatch({ type: "login-case", payload: {} });
      navigate("/");
    } else {
      navigate(link);
    }
  };
  return <li onClick={profileHandler}>{item}</li>;
};

export default Profile;
