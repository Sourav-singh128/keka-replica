import React, { useState } from "react";
import Tab from "../components/tabs/Tab";
const Home = () => {
  const [userData, setUserData] = useState([]);
  const dataHandler = () => {
    const token = sessionStorage.getItem("token");
    console.log("home-token ", token);
    fetch("/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        console.log("data-recieved ", res.info);
        setUserData(res.info);
      });
  };
  return (
    <>
      {/* <div>Home</div> */}
      {/* <button onClick={dataHandler}>request Data</button>
      <div>
        {userData.map((val, ind) => {
          return <div key={ind}>{val.name}</div>;
        })}
      </div> */}
      <Tab />
    </>
  );
};

export default Home;
