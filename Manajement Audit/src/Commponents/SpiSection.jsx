import React, { useState } from "react";
import LogoPTDI from "../Asset/LogoPTDI.png";
import LogoUser from "../Asset/user.png";
import "../App.css";

const SpiSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdownSpi = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`spi-section ${isCollapsed ? "collapsed" : ""}`}>
      <header className="header">
        <div className="logo-container">
          <img src={LogoPTDI} className="brand-logo" alt="Logo" />
          <div className="SideNav-text">SPI</div>
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
            <ul className="menuSpi">
              <li>Dashboard</li>
              <li>Upload File Excel</li>
              <li
                className={`dropdownSpi ${isDropdownOpen ? "open" : ""}`}
                onClick={toggleDropdownSpi}
              >
                Evidence
                {isDropdownOpen && (
                  <ol className="submenuSpi">
                    <li>DGCA</li>
                    <li>FINANCE</li>
                    <li>ITML</li>
                    <li>PARKER RUSSEL</li>
                  </ol>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <main className="main-content">
          <Dashboard />
        </main>
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

export default SpiSection;
