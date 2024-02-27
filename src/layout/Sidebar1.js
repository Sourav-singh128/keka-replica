import React, { useState } from "react";
import Sidebar1Comp from "./Sidebar1Comp";
import "./sidebar.css";
const menus = [
  { id: 1, text: "Home", link: "/", isActive: true },
  { id: 2, text: "News", link: "/news", isActive: false },
  { id: 3, text: "Contact", link: "/contact", isActive: false },
  { id: 4, text: "About", link: "/about", isActive: false },
];
const Sidebar1 = () => {
  const [value, setValue] = useState(menus);
  const currentActive = (ind) => {
    const newValue = value.map((val) => {
      if (val.id == ind) {
        return { ...val, isActive: true };
      } else {
        return { ...val, isActive: false };
      }
    });
    setValue(newValue);
  };
  return (
    <>
      <div class="sidebar">
        {value.map((menu, ind) => {
          return (
            <Sidebar1Comp
              text={menu.text}
              link={menu.link}
              isActive={menu.isActive}
              currentActive={currentActive}
              ind={ind + 1}
              key={ind}
            />
          );
        })}
      </div>
    </>
  );
};

export default Sidebar1;
