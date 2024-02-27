import React, { useState, useContext } from "react";
import { themeCtx } from "../context/themeContext";
import "./toggleButton.css";
const ToggleButton = () => {
  // const [toggleActive, setToggleActive] = useState(true);
  const consumeTheme = useContext(themeCtx);
  // console.log("consumer ", consumeTheme);

  const toggleHandler = (event) => {
    console.log("clicked");
    if (consumeTheme.theme.color === "#f3f4f7") {
      consumeTheme.setTheme({ color: "#1b2531" });
    } else {
      consumeTheme.setTheme({ color: "#f3f4f7" });
    }
    event.stopPropagation();
  };
  return (
    <div
      className={
        consumeTheme.theme.color === "#f3f4f7"
          ? "container background-light"
          : "container background-dark"
      }
      onClick={toggleHandler}>
      <div
        className={
          consumeTheme.theme.color === "#f3f4f7"
            ? "circle circle-active"
            : "circle"
        }></div>
      <div
        className={
          consumeTheme.theme.color === "#f3f4f7"
            ? "circle"
            : "circle circle-active"
        }></div>
    </div>
  );
};

export default ToggleButton;
