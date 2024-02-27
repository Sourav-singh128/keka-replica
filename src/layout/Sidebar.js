import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
const Sidebar = () => {
  useEffect(() => {
    document.querySelector(".sidebar").addEventListener("click", (event) => {
      document.querySelectorAll(".sidebar a").forEach((obj) => {
        obj.classList.remove("active");
      });
    });

    document.querySelector(".cont").addEventListener("click", (event) => {
      console.log(event.target);
      event.target.classList.add("active");
    });
  }, []);

  return (
    <div className="cont">
      <div class="sidebar">
        <a class="active" href="#home">
          Home
        </a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};

export default Sidebar;
