import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Sidebar1 from "./layout/Sidebar1";
import { themeCtx } from "./context/themeContext";
// import related to cloudnary.
import { cloudinary } from "@cloudinary/url-gen";
// import Sidebar from "./layout/Sidebar";
import Login from "./form/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./form/SignUp";
import Protected from "./util/Protected";
import Footer from "./layout/Footer";

function App() {
  const [theme, setTheme] = useState({ color: "#f3f4f7" });

  return (
    <div className="App">
      <themeCtx.Provider value={{ theme: theme, setTheme: setTheme }}>
        <Navbar />
        <Sidebar1 />
        <div style={{ marginLeft: "200px" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route
              path="/about"
              element={
                <Protected>
                  <About />
                </Protected>
              }
            />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </themeCtx.Provider>
    </div>
  );
}

export default App;
