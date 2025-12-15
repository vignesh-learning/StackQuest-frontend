import React from "react";
import "./home.css";

function Home() {
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
            <input type="search" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="quiz-container">
          <div className="left-side">
            <h3 className="question-text">FULL STACK TRAINING</h3>
            <h2 className="option-instruction">Learn Python Full Stack & Data Science</h2>
            <p>Enroll now to learn from an expert full-stack developer!</p>
            <div className="navigation">
              <a href="/about">
                <button>DETAILS &gt;</button>
              </a>
            </div>
          </div>
          <div className="right-side">
            <img src="images - Copy.jpeg" alt="Training" style={{ borderRadius: "10px", width: "100%", height: "auto" }} />
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="bottom-images">
          <img src="html.png" alt="HTML" />
          <img src="css.jpeg" alt="CSS" />
          <img src="js.png" alt="JavaScript" />
          <img src="php.png" alt="PHP" />
          <img src="download.jpeg" alt="Python" />
          <img src="react.jpeg" alt="React" />
          <img src="node.png" alt="Node" />
        </div>
      </footer>

      <div className="main-content">
        <div className="quiz-container">
          <div className="left-side">
            <div className="header-top">
              <img src="time.png" alt="Timer" />
            </div>
            <p className="text-content">In just 15+ hours, you will successfully learn web development with a comprehensive course.</p>
          </div>
          <div className="right-side">
            <div className="header-top">
              <img src="certificate.png" alt="Certificate" />
            </div>
            <p className="text-content">You will receive a certificate upon completing the course successfully.</p>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="quiz-container">
          <div className="left-side">
            <h1 className="question-text">FULL STACK WEB DEVELOPMENT</h1>
            <p className="text-content">
              Full-stack web development involves both front-end and back-end technologies, enabling developers to build complete web applications. On the front-end, developers focus on creating the user interface and experience using HTML, CSS, and JavaScript. On the back-end, they handle server-side logic, databases, and server communication using Node.js, Python, Ruby, or PHP.
            </p>
            <p className="text-content" style={{ color: "orange" }}>
              Full-stack development offers the advantage of versatility and independence, helping developers manage the entire process smoothly.
            </p>
          </div>
          <div className="right-side">
            <img src="coding.jpeg" alt="Full Stack" className="image-box" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
