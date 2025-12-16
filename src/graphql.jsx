import React from "react";
import "./graph.css";
import { useNavigate } from "react-router-dom";

function Graphql(){

  const navigate = useNavigate();

  const isCertificateUnlocked = () => {
    const s1 = localStorage.getItem("course_module1");
    const s2 = localStorage.getItem("course_module2");
    const s3 = localStorage.getItem("course_module3");
    const s4 = localStorage.getItem("course_module4");
    const s5 = localStorage.getItem("course_module5");
    const s6 = localStorage.getItem("course_practicegraphql");

    return (s1 === "completed" && s2 === "completed" && s3 === "completed" && s4 === "completed" && s5 === "completed" && s6 ==="completed");
  };

  const handleCertificateClick = () => {
    if (!isCertificateUnlocked()) {
      alert("⚠️ You must complete module1, module2, module3, module4, module5, and practicegraphql to unlock the certificate.");
      return;
    }
    navigate("/certificate/graphql");   
  };
    return(
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
        </div>
      </header>

        <main>
            <div className="graphql-container">
            <h1>Module 1</h1>
            <a href="/module1" style={{textDecoration:"none",color:"inherit"}}>
            <div className="container-one">
                <img src="/onee.jpg" />
                <h3 className="text">Introduction</h3>
            </div>
            </a>
            </div>

            <div className="container-then">
              <h1>Module 2</h1>
              <a href="/module2" style={{textDecoration:"none",color:"inherit"}}>
              <div className="container-two">
                  <img src="/two.jpg" />
                  <h3 className="text">GraphQL Basics</h3>
              </div>
              </a>
            </div>

            <div className="container-and">
              <h1>Module 3</h1>
              <a href="/module3" style={{textDecoration:"none",color:"inherit"}}>
              <div className="container-three">
                  <img src="/three.jpg" />
                  <h3 className="text">Backend with GraphQL</h3>
              </div>
              </a>
            </div>

            <div className="container-to">
              <h1>Module 4</h1>
              <a href="/module4" style={{textDecoration:"none",color:"inherit"}}>
              <div className="container-four">
                  <img src="/four.jpeg" />
                  <h3 className="text">Frontend with GraphQL</h3>
              </div>
              </a>
            </div>

            <div className="container-at">
              <h1>Module 5</h1>
              <a href="/module5"style={{textDecoration:"none",color:"inherit"}}>
              <div className="container-five">
                  <img src="/five.jpeg" />
                  <h3 className="text">Advanced GraphQL</h3>
              </div>
              </a>
            </div>

            <div className="container-last">
                <h1>Paractice</h1>
                <a href="/practicegraphql" style={{textDecoration:"none",color:"inherit"}}>
                <div className="container-six">
                    <img src="/six.jpeg" />
                    <h3 className="text">Paractice GraphQL Course</h3>
                </div>
                </a>
            </div>
        </main>
        </div>
    )
}
export default Graphql;