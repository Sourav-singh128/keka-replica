import React, { useEffect } from "react";
import { intercept } from "../Interceptor";
const About = () => {
  useEffect(() => {
    intercept();
    fetch("/login-cred");
  }, []);
  return <div>About</div>;
};

export default About;
