import React from "react";
import "./css.css"; 
import { useNavigate } from "react-router-dom";

function Css() {

  const navigate = useNavigate();

  const isCertificateUnlocked = () => {
    const s1 = localStorage.getItem("css_stage1");
    const s2 = localStorage.getItem("css_stage2");
    const s3 = localStorage.getItem("css_stage3");

    return (s1 === "completed" && s2 === "completed" && s3 === "completed");
  };

  const handleCertificateClick = () => {
    if (!isCertificateUnlocked()) {
      alert("⚠️ You must complete Beginner, Intermediate, and Advanced CSS to unlock the certificate.");
      return;
    }
    navigate("/certificate/css");   
  };

  return (
    <div>
      <header className="main-header">
        <div className="header-left">
          <a href="/account">
            <i className="fa-regular fa-user"></i> Account
          </a>
        </div>
        <div className="header-right">
          <nav>
            <a href="/home">Home</a>
            <a href="/practice">Practice</a>
            <a href="/complete">Complete</a>
            <a href="/about">About</a>
          </nav>
          <div className="search-container">
            <input type="search" id="searchInput" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </header>

      <main>
        <div className="header-top" style={{ textAlign: "center" }}>
          <img src="css css.jpg" alt="CSS Icon" />
        </div>

        <div className="divider"></div>
        <br />

        <div className="container-css">
          <h1>🟢 Beginner CSS Topics</h1>
          <a href="/Beginer" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="one-container">
              <img src="onee.jpg" alt="Beginner" />
              <h3 className="text-content">Start your career.....</h3>
            </div>
          </a>
        </div>

        <div className="container-next">
          <h1>🟡 Intermediate CSS Topics</h1>
          <a href="/Intermediate" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="two-container">
              <img src="two.jpg" alt="Intermediate"/>
              <h3 className="text-content">Grow your skills.....</h3>
            </div>
          </a>
        </div>

        <div className="container-style">
          <h1>🔴 Advanced CSS Topics</h1>
          <a href="/Advanced" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="three-container">
              <img src="three.jpg" alt="Advanced" />
              <h3 className="text-content">Final Learn.......</h3>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}

export default Css;
