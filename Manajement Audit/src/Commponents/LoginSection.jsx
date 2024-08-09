import React, { useState } from "react";
import Modal from "react-modal";
import ImgLogin from "../Asset/ImgLogin.jpg";
import { useNavigate } from "react-router-dom";
import "../App.css";

Modal.setAppElement("#root");

export default function LoginSection() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const closeModal = () => setModalIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin") {
      alert("Welcome, Admin!");
      navigate("../Admin");
    }
    if (email === "spi@gmail.com" && password === "spi") {
      alert("Welcome, SPI!");
      navigate("../Spi");
    }
    if (email === "audit@gmail.com" && password === "audit") {
      alert("Welcome, Admin Audit IT!");
      navigate("../AdminAuditIt");
    }
    if (email === "auditee@gmail.com" && password === "auditee") {
      alert("Welcome, Auditee!");
      navigate("../Auditee");
    }
    closeModal();
  };

  return (
    <div className="ImgLogin">
      <img src={ImgLogin} alt="Login" />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </Modal>
    </div>
  );
}
