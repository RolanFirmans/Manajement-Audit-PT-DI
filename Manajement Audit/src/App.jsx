import React from "react";
import Login from "../src/Login/Login.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import About from "./LandingPage/About.jsx";
import AboutRoles from "./LandingPage/AboutRoles.jsx";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin/Admin.jsx";
import AdminAuditIT from "./Admin Audit IT/AdminAuditIT.jsx";
import SPI from "./SPI/SPI.jsx";
import Auditor from "./Auditor/Auditor.jsx";
import Auditee from "./Auditee/Auditee.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="About" element={<About />} />
        <Route path="AboutRoles" element={<AboutRoles />} />
        <Route path="Login" element={<Login />} />
        <Route path="Admin" element={<Admin />} />
        <Route path="AdminAuditIT" element={<AdminAuditIT />} />
        <Route path="SPI" element={<SPI />} />
        <Route path="Auditor" element={<Auditor />} />
        <Route path="Auditee" element={<Auditee />} />
      </Routes>
    </div>
  );
}

export default App;
