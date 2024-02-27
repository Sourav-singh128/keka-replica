import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import "./navbar.css";
import ToggleButton from "../components/ToggleButton";
import { useContext } from "react";
import { themeCtx } from "../context/themeContext";
import { useSelector, useDispatch } from "react-redux";
import Profile from "../components/Profile";
import { useNavigate } from "react-router-dom";
import { intercept } from "../Interceptor";
const link = [{ text: "Profile", link: "/profile" }, { text: "Logout" }];
const Navbar = () => {
  const initialColor = localStorage.getItem("color");
  const [color, setColor] = useState(initialColor);
  const consumeTheme = useContext(themeCtx);
  const state = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    intercept();
    const token = sessionStorage?.getItem("token");
    if (token) {
      fetch("/login-cred", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      })
        .then((data) => data.json())
        .then((res) => {
          // console.log("resp-nav ", res);
          if (res.error) {
            // console.log("consoling-error ", res.error.message);

            throw new Error(res.error.message);
          }
          if (res.user) {
            dispatch({
              type: "login-case",
              payload: { username: res.user.username, email: res.user.email },
            });
          }
        })
        .catch((err) => {
          // console.log("comming");
          console.log(err.message);
          if (err.message.includes("jwt expired")) {
            sessionStorage.clear("token");
            navigate("/login");
          }
        });
    }
    window.onclick = (event) => {
      document.querySelector(".dropdown-container").classList.add("hide");
    };
  }, []);
  const profileHandler = (event) => {
    // console.log(event.target);
    const profileEle = document.querySelector(".MuiAvatar-root");
    let flag = false;
    const dropdownEle = document.querySelector(".dropdown-container").classList;
    dropdownEle.forEach((val) => {
      if (val === "hide") {
        flag = true;
      }
    });
    // console.log("flag ", flag);
    if (event.target === profileEle && flag) {
      document.querySelector(".dropdown-container").classList.remove("hide");
      event.stopPropagation();
    } else {
      document.querySelector(".dropdown-container").classList.add("hide");
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: color }}>
      <a className="navbar-brand" href="#" style={{ color: "white" }}>
        My Website
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
        style={{ gap: "10px", color: "white" }}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
              <div className="d-flex justify-content-between">
                <div
                  className="box"
                  style={{ backgroundColor: "blue" }}
                  onClick={() => {
                    localStorage.setItem("color", "blue");
                    setColor("blue");
                  }}></div>
                <div
                  className="box bg-danger"
                  style={{ backgroundColor: "pink" }}
                  onClick={() => {
                    localStorage.setItem("color", "pink");
                    setColor("pink");
                  }}></div>
                <div
                  className="box"
                  style={{ backgroundColor: "green" }}
                  onClick={() => {
                    localStorage.setItem("color", "green");
                    setColor("green");
                  }}></div>
                <div
                  className="box"
                  style={{ backgroundColor: "orange" }}
                  onClick={() => {
                    localStorage.setItem("color", "orange");
                    setColor("orange");
                  }}></div>
                <div
                  className="box"
                  style={{ backgroundColor: "violet" }}
                  onClick={() => {
                    localStorage.setItem("color", "violet");
                    setColor("violet");
                  }}></div>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            className="input-color"
            style={{ backgroundColor: consumeTheme.theme.color }}
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <div>
          {state?.username
            ? state?.username.charAt(0).toUpperCase() +
              state?.username.substring(1)
            : null}
        </div>
        <div className="profile" onClick={profileHandler}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {state && state?.username?.substring(0, 2)}
          </Avatar>
          <div className="dropdown-container hide">
            {link.map((item, ind) => (
              <Profile key={ind} item={item.text} link={item.link} />
            ))}
            <ToggleButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
