import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const state = useSelector((state) => state);
  const submitHandler = (event) => {
    event.preventDefault();
    // console.log("length ", userNameRef.current.value.length);
    if (
      emailRef.current.value.length > 3 &&
      passwordRef.current.value.length > 3
    ) {
      console.log("coming inside if");
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          dispatch({
            type: "login-case",
            payload: { username: res.user.username, email: res.user.email },
          });
          sessionStorage.setItem("token", JSON.stringify(res.token));
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });

      // window.history.replaceState("", "", "/");
      // window.history.pushState(null, "", "/");

      // console.log("state ", state.login);
    }
  };

  const showPassword = () => {
    const ele = document.getElementById("password");
    if (ele.type == "password") {
      ele.type = "text";
    } else {
      ele.type = "password";
    }
  };
  return (
    <>
      <div className="form">
        <form>
          <div className="input-container">
            <label>Email </label>
            <input ref={emailRef} type="text" name="uname" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              ref={passwordRef}
              type="password"
              name="pass"
              required
              id="password"
            />
            <input type="checkbox" onClick={showPassword} id="checkbox" />
          </div>
          <div className="button-container">
            <input type="submit" onClick={submitHandler} />
          </div>
        </form>
      </div>
      <button
        className="sign-up"
        onClick={() => {
          navigate("/register");
        }}>
        Sign Up
      </button>
    </>
  );
};

export default Login;
