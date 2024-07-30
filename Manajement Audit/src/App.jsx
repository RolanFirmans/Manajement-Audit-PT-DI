import React from "react";
<<<<<<< HEAD
import LandingPage from "../src/LandingPage/LandingPage.jsx";
import About from "../src/LandingPage/About.jsx";
import Login from "../src/Login/Login.jsx";
=======
import LandingPage from "./LandingPage.jsx";
import About from "./About.jsx";
import AboutRoles from "./AboutRoles.jsx";
>>>>>>> 8c38e30 (Update AboutRoles)
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
<<<<<<< HEAD
        <Route path="Login" element={<Login />} />
        <Route path="Admin" element={<Admin />} />
        <Route path="AdminAuditIT" element={<AdminAuditIT />} />
        <Route path="SPI" element={<SPI />} />
        <Route path="Auditor" element={<Auditor />} />
        <Route path="Auditee" element={<Auditee/>} />

=======
        <Route path="AboutRoles" element={<AboutRoles />} />
>>>>>>> 8c38e30 (Update AboutRoles)
      </Routes>
    </div>
  );
}

export default App;
