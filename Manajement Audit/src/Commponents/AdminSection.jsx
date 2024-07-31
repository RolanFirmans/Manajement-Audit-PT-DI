import React, { useState } from 'react';
import LogoPTDI from '../Asset/LogoPTDI.png';
import '../App.css';

const AdminSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`admin-section ${isCollapsed ? 'collapsed' : ''}`}>
      <header className="header">
        
        <div className="logo-container">
          <img src={LogoPTDI} className="brand-logo" alt="Logo" />
          <div className="SideNav-text">
          AUDIT
        </div>
         
        </div>
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="user-info">
          <img src="/path-to-user-image.jpg" alt="User" className="user-image" />
          <p className="user-name">USER</p>
          <button className="logout-button">Log Out</button>
        </div>
      </header>
      <div className="content-wrapper">
        <div className={`side-nav ${isCollapsed ? 'collapsed' : ''}`}>
          <nav>
            <ul>
              <li>Dashboard</li>
              <li>Data User</li>
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

export default AdminSection;
