import React, { useState } from "react";
import LogoPTDI from "../Asset/LogoPTDI.png";
import LogoUser from "../Asset/user.png";
import "../App.css";

const AuditeeSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdownSpi = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEvidenceClick = () => {
    setActivePage("Evidence");
    toggleDropdownSpi();
  };

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Upload File Excel":
        return <UploadFileExcel />;
      case "Evidence":
        return <Evidence />;
      case "DGCA":
        return <DGCA />;
      case "FINANCE":
        return <Finance />;
      case "ITML":
        return <ITML />;
      case "PARKER RUSSEL":
        return <ParkerRussel />;
      default:
        return null;
    }
  };

  return (
    <div className={`Auditee-section ${isCollapsed ? "collapsed" : ""}`}>
      <header className="header">
        <div className="logo-container">
          <img src={LogoPTDI} className="brand-logo" alt="Logo" />
          <div className="SideNav-text">Auditee</div>
        </div>
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="user-info">
          <p className="user-name">USER</p>
          <img src={LogoUser} alt="User" className="user-image" />
          <button className="logout-button">Log Out</button>
        </div>
      </header>

      <div className="content-wrapper">
        <div className={`side-nav ${isCollapsed ? "collapsed" : ""}`}>
          <nav>
            <ul className="menuAuditee">
              <li>Dashboard</li>
              <li
                className={`dropdownSpi ${isDropdownOpen ? "open" : ""}`}
                onClick={handleEvidenceClick}
              >
                Evidence
                {isDropdownOpen && (
                  <ol
                    className="submenuSpi"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <li onClick={() => setActivePage("DGCA")}>DGCA</li>
                    <li onClick={() => setActivePage("FINANCE")}>FINANCE</li>
                    <li onClick={() => setActivePage("ITML")}>ITML</li>
                    <li onClick={() => setActivePage("PARKER RUSSEL")}>
                      PARKER RUSSEL
                    </li>
                  </ol>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-content">
        {/* Dashboard content goes here */}
      </div>
    </div>
  );
};

const Evidence = () => (
  <div className="evidence-content">
    <h2>Evidence</h2>
  </div>
);

const DGCA = () => {
  return (
    <div className="dgca-content">
      <h2>DGCA</h2>
    </div>
  );
};

const Finance = () => {
  return (
    <div className="finance-content">
      <h2>FINANCE</h2>
    </div>
  );
};

const ITML = () => {
  return (
    <div className="itml-content">
      <h2>ITML</h2>
    </div>
  );
};

const ParkerRussel = () => {
  return (
    <div className="parker-russel-content">
      <h2>PARKER RUSSEL</h2>
    </div>
  );
};

export default AuditeeSection;
