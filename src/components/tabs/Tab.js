import React, { useState } from "react";
import "./tab.css";
import OrganizationTab from "./OrganizationTab";
import DigitalTechTab from "./DigitalTechTab";
const Tab = () => {
  const [active, setActive] = useState("Organizations");
  return (
    <>
      <div className="tab-container">
        <div className="left-box"></div>
        <div className="main-box">
          <div className="tabs">
            <ul className="tab-nav">
              <li
                className={active === "Organizations" ? "active" : ""}
                onClick={() => setActive("Organizations")}>
                Organizations
              </li>
              <li
                className={active === "Digital Technology" ? "active" : ""}
                onClick={() => setActive("Digital Technology")}>
                Digital Technology
              </li>
            </ul>
            {active == "Organizations" && <OrganizationTab />}
            {active == "Digital Technology" && <DigitalTechTab />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab;
