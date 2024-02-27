import React from "react";
import { Link } from "react-router-dom";
const Sidebar1Comp = ({ text, link, isActive, ind, currentActive }) => {
  // console.log("current ", isActive, "text ", text);
  return (
    <Link
      to={link}
      className={isActive ? "active" : undefined}
      onClick={() => {
        currentActive(ind);
      }}>
      {text}
    </Link>
  );
};

export default Sidebar1Comp;
