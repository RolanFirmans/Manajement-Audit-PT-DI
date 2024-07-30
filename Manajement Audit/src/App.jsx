import React from "react";
import LandingPage from "./LandingPage.jsx";
import About from "./About.jsx";
import AboutRoles from "./AboutRoles.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="About" element={<About />} />
        <Route path="AboutRoles" element={<AboutRoles />} />
      </Routes>
    </div>
  );
}

export default App;
