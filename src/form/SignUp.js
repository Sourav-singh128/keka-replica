import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const SignUp = () => {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submit-clicked");
    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userNameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        password: passwordRef.current.value,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        console.log("res ", res);
        sessionStorage.setItem("token", JSON.stringify(res.token));
        dispatch({
          type: "login-case",
          payload: { username: res.user.username, email: res.user.email },
        });
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/");
  };
  return (
    <>
      <div className="form">
        <form onSubmit={submitHandler}>
          <div className="input-container">
            <label>Username </label>
            <input ref={userNameRef} type="text" name="uname" required />
          </div>
          <div className="input-container">
            <label>Email </label>
            <input ref={emailRef} type="text" name="uname" required />
          </div>
          <div className="input-container">
            <label>Phone No. </label>
            <input ref={phoneRef} type="text" name="uname" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input ref={passwordRef} type="password" name="pass" required />
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
