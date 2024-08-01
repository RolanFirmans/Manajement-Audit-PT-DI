<<<<<<< HEAD

import React, { useState } from 'react';
import LogoPTDI from '../Asset/LogoPTDI.png';
import '../App.css';
=======
import React, { useState } from "react";
import LogoPTDI from "../Asset/LogoPTDI.png";
import Modal from "react-modal";
import "../App.css";
>>>>>>> 2a44448 (Update)
import LogoUser from "../Asset/user.png";
import DataUser from '../Admin/DataUser';

const AdminSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderContent = () => {
    if (activePage === "Dashboard") {
      return <Dashboard />;
    } else if (activePage === "Data User") {
      return <DataUser />;
    }
  };

  return (
    <div className={`admin-section ${isCollapsed ? "collapsed" : ""}`}>
      <header className="header">
        <div className="logo-container">
          <img src={LogoPTDI} className="brand-logo" alt="Logo" />
          <div className="SideNav-text">AUDIT</div>
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
            <ul>
              <li onClick={() => setActivePage("Dashboard")}>Dashboard</li>
              <li onClick={() => setActivePage("Data User")}>Data User</li>
            </ul>
          </nav>
        </div>
        <main className="main-content">{renderContent()}</main>
      </div>
   
    </div>
  );
};

// DASHBOARD
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-content">{/* Konten dashboard */}</div>
    </div>
  );
};

// DATA USER

<<<<<<< HEAD


=======
Modal.setAppElement("#root");

const orders = [
  {
    no: 1,
    NIP: "123456",
    Name: "Maya Wulandari",
    Role: "ADMIN",
    Organization: "DC1500",
    Email: "maya.wlndr@example.com",
    Action: "",
  },
];

const DataUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    NIP: "",
    Name: "",
    Role: "",
    Organization: "",
    Email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    // Add user logic
    console.log("New user added:", newUser);
    setIsModalOpen(false);
  };

  return (
    <div className="data-user">
      <h2>Data User</h2>
      <div className="AddUser">
        <button
          className="add-user-button"
          onClick={() => setIsModalOpen(true)}
        >
          Add User
        </button>
      </div>
      <div className="data-user-content">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>NIP</th>
              <th>Name</th>
              <th>Role</th>
              <th>Organization</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.no}>
                <td>{order.no}</td>
                <td>{order.NIP}</td>
                <td>{order.Name}</td>
                <td>{order.Role}</td>
                <td>{order.Organization}</td>
                <td>{order.Email}</td>
                <td>
                  <button>Delete</button>
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add User Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h3>Add Data User</h3>
        <div>
          <label>NIP</label>
          <input
            type="text"
            name="NIP"
            value={newUser.NIP}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="Name"
            value={newUser.Name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Role</label>
          <input
            type="text"
            name="Role"
            value={newUser.Role}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Organization</label>
          <input
            type="text"
            name="Organization"
            value={newUser.Organization}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="Email"
            value={newUser.Email}
            onChange={handleInputChange}
          />
        </div>
        <div className="modal-actions">
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button onClick={handleAddUser}>Add</button>
        </div>
      </Modal>
    </div>
  );
};
>>>>>>> 2a44448 (Update)

export default AdminSection;
