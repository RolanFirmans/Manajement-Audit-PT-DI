import React from "react";
import { Link } from "react-router-dom";
import LogoPTDI from "../Asset/LogoPTDI.png";
import "../App.css";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <img src={LogoPTDI} className="brand-logo" />
          <ul className="nav-list">
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="../About">ABOUT US</a>
            </li>
            <li>
              <a href="/AboutRoles">ABOUT AUDIT ROLES</a>
            </li>
          </ul>
          <Link to="" className="btn-login">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
