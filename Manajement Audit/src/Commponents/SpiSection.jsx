import React, { useState } from "react";
import LogoPTDI from "../Asset/LogoPTDI.png";
import axios from "axios";
import LogoUser from "../Asset/user.png";
import "../App.css";

const SpiSection = () => {
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
              <li onClick={() => setActivePage("Dashboard")}>Dashboard</li>
              <li onClick={() => setActivePage("Upload File Excel")}>
                Upload File Excel
              </li>
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

const Dashboard = () => (
  <div className="dashboard">
    <h2>Dashboard</h2>
    <div className="dashboard-content">{/* Dashboard content goes here */}</div>
  </div>
);

// START UPLOAD EXXCEL

const UploadFileExcel = () => {
  const ImportDataStock = () => {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const hasExtension = (fileName, exts) => {
      return new RegExp(`(${exts.join("|").replace(/\./g, "\\.")})$`).test(
        fileName
      );
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file || !hasExtension(file.name, [".xls", ".xlsx"])) {
        alert("Hanya file XLS atau XLSX (Excel) yang diijinkan.");
        return;
      }

      const formData = new FormData();
      formData.append("filepelamar", file);

      try {
        const response = await axios.post(
          "exec-import-excel-stock.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );

        setMessage(
          <span>
            <i className="fa fa-check"></i>{" "}
            <font color="green">{response.data}</font>
          </span>
        );
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        setFile(null);
        setUploadProgress(0);
      } catch (error) {
        setMessage(<font color="red">ERROR: unable to upload files</font>);
        setShowMessage(true);
      }
    };

    return (
      <div>
        <header>
          <h3>Import Data Stock</h3>
        </header>
        <form
          id="FormExcelDoc"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="row">
            <div className="col-md-12" style={{ padding: "10px 30px" }}>
              {showMessage && (
                <div id="result" className="alert alert-success">
                  {message}
                </div>
              )}
            </div>
          </div>
          <fieldset className="label_side" id="facnumber">
            <label>Template File Excel</label>
            <div className="clearfix">
              <a className="btn btn-success" href="template/templatestock.xls">
                Download Template
              </a>
            </div>
          </fieldset>
          <fieldset className="label_side" id="facnumber">
            <label>Upload File</label>
            <div className="clearfix">
              <div className="input-group margin" style={{ width: "50%" }}>
                <input
                  type="file"
                  name="filepelamar"
                  id="filepelamar"
                  className="form-control"
                  onChange={handleFileChange}
                />
                <span className="input-group-btn">
                  <input
                    type="submit"
                    className="btn btn-info"
                    value="Upload"
                    title="Upload File Excel Stock"
                  />
                </span>
              </div>
              <i>Format .XLS atau .XLSX (Excel)</i>
            </div>
          </fieldset>
        </form>
        <fieldset className="label_side" id="facnumber">
          <label>Progress</label>
          <div className="clearfix">
            <div id="progress1">
              <div id="bar1" style={{ width: `${uploadProgress}%` }}></div>
              <div id="percent1">{uploadProgress}%</div>
            </div>
          </div>
        </fieldset>
      </div>
    );
  };

  return <ImportDataStock />;
};

// END UPLOAD EXCEL

const Evidence = () => (
  <div className="evidence-content">
    <h2>Evidence</h2>
  </div>
);

const DGCA = () => (
  <div className="dgca-content">
    <h2>DGCA</h2>
  </div>
);

const Finance = () => (
  <div className="finance-content">
    <h2>FINANCE</h2>
  </div>
);

const ITML = () => (
  <div className="itml-content">
    <h2>ITML</h2>
  </div>
);

const ParkerRussel = () => (
  <div className="parker-russel-content">
    <h2>PARKER RUSSEL</h2>
  </div>
);

export default SpiSection;
export { UploadFileExcel };
