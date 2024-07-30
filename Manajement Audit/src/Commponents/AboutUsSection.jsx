import React from "react";
import q from "../Asset/q.jpg";
import "../App.css";

const AboutUsSection = () => {
  return (
    <div className="about-section">
      <h1>COMPANY OVERVIEW</h1>
      <div className="about-images">
        <img src={q} alt="" />
      </div>
      <div className="company-overview">
        <h2>PT DIRGANTARA INDONESIA</h2>
        <p>Jl. Pajajaran No 154, Bandung 40174, Indonesia</p>
      </div>
    </div>
  );
};

export default AboutUsSection;
