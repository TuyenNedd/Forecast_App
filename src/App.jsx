import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import "./App.css";
import SignInGG from "./components/GGLogin/signIn.jsx";
import Home from "./components/home/Home.jsx";
import "./index.css";
import UserDropdown from "./components/UserDropdown.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />{" "}
          {/* Route to Home component */}
          <Route path="/" element={<SignInGG />} /> {/* Default route */}
        </Routes>
      </Router>

      {/* <UserDropdown></UserDropdown> */}
    </>
  );
}

export default App;
