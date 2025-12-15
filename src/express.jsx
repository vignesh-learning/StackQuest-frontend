import React, { useState, useEffect } from "react";
import "./express.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const expressQuestions = [
  {
    type: "code",
    format: "terminal",
    question: "Initialize a new Node.js project.",
    expected: "npm init -y"
  },
  {
    type: "code",
    format: "terminal",
    question: "Install Express framework.",
    expected: "npm install express"
  },
  {
    type: "code",
    format: "terminal",
    question: "Install nodemon as a development dependency.",
    expected: "npm install --save-dev nodemon"
  },
  {
    type: "code",
    format: "code",
    question: "Create a basic Express server.",
    expected: `const express = require('express');\nconst app = express();\nconst PORT = 3000;\n\napp.get('/', (req, res) => {\n  res.send('Hello Express');\n});\n\napp.listen(PORT, () => {\n  console.log('Server running on port', PORT);\n});`
  },
  {
    type: "code",
    format: "code",
    question: "Add middleware to parse JSON.",
    expected: `app.use(express.json());`
  },
  {
    type: "code",
    format: "code",
    question: "Add middleware to parse URL-encoded data.",
    expected: `app.use(express.urlencoded({ extended: true }));`
  },
  {
    type: "code",
    format: "code",
    question: "Serve static files from the 'public' folder.",
    expected: `app.use(express.static('public'));`
  },
  {
    type: "code",
    format: "code",
    question: "Create a GET route for '/' that returns 'Welcome!'.",
    expected: `app.get('/', (req, res) => {\n  res.send('Welcome!');\n});`
  },
  {
    type: "code",
    format: "code",
    question: "Handle POST request with JSON body.",
    expected: `app.post('/data', (req, res) => {\n  res.send('Received: ' + JSON.stringify(req.body));\n});`
  },
  {
    type: "code",
    format: "code",
    question: "Create a dynamic route using route parameters.",
    expected: `app.get('/user/:id', (req, res) => {\n  res.send('User ID: ' + req.params.id);\n});`
  },
  {
    type: "code",
    format: "code",
    question: "Create a 404 error handler.",
    expected: `app.use((req, res) => {\n  res.status(404).send('Page not found');\n});`
  },
  {
    type: "code",
    format: "code",
    question: "Add centralized error handling middleware.",
    expected: `app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).send('Something broke!');\n});`
  },
  {
    type: "code",
    format: "terminal",
    question: "Install the CORS package.",
    expected: "npm install cors"
  },
  {
    type: "code",
    format: "code",
    question: "Use CORS middleware in your Express app.",
    expected: `const cors = require('cors');\napp.use(cors());`
  },
  {
    type: "code",
    format: "code",
    question: "Log each request method and URL using middleware.",
    expected: `app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});`
  },
  {
    type: "code",
    format: "code",
    question: "Respond with JSON using Express.",
    expected: `app.get('/json', (req, res) => {\n  res.json({ message: 'Hello JSON' });\n});`
  },
  {
    type: "code",
    format: "code",
    question: "Use query parameters to filter a GET request.",
    expected: `app.get('/search', (req, res) => {\n  const q = req.query.q;\n  res.send('Search for: ' + q);\n});`
  },
  {
    type: "code",
    format: "terminal",
    question: "Install dotenv package to use environment variables.",
    expected: "npm install dotenv"
  },
  {
    type: "code",
    format: "code",
    question: "Use dotenv to load environment variables.",
    expected: `require('dotenv').config();\nconst PORT = process.env.PORT || 3000;`
  },
  {
    type: "code",
    format: "code",
    question: "Use Express Router in a separate module.",
    expected: `const express = require('express');\nconst router = express.Router();\n\nrouter.get('/', (req, res) => {\n  res.send('Router Home');\n});\n\nmodule.exports = router;`
  }
];

function Express() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [theme, setTheme] = useState("dark-mode");

  const question = expressQuestions[currentQuestion];
  const totalQuestions = expressQuestions.length;

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const progress = Math.floor(((currentQuestion + 1) / totalQuestions) * 100);
    localStorage.setItem("course_express_progress", progress);

    if (currentQuestion === totalQuestions - 1) {
      localStorage.setItem("course_express_completed", "true");
      alert("🎉 Congratulations! You completed the JavaScript course!");

      window.location.href = "/complete";
    }
  }, [currentQuestion, totalQuestions]);

  const normalize = (str) =>
    str.replace(/\s+/g, "").replace(/;+/g, "").toLowerCase();

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const input = terminalInput.trim();
    if (!input) return;

    if (question.format === "terminal") {
      setTerminalOutput((prev) => [...prev, `> ${input}`]);
    }

    setTerminalInput("");

    const isCorrect =
      (question.format === "terminal" && input === question.expected.trim()) ||
      (question.format === "code" && normalize(input) === normalize(question.expected));

    if (isCorrect) {
      setFeedback("✅ Correct!");
      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion((prev) => prev + 1);
          setTerminalInput("");
          setFeedback("");
          setTerminalOutput([]);
        } else {
          alert("🎉 You've completed the Express course!");
          window.location.href = "/complete"; 
        }
      }, 1000);
    } else {
      setFeedback("❌ Incorrect. Try again.");
    }
  };

  return (
    <div className={theme}>
      <header className="main-header">
        <div className="header-left">
          <a href="/account"><i className="fa-regular fa-user"></i> Account</a>
        </div>
        <div className="header-right">
          <nav>
            <a href="/home">Home</a>
            <a href="/practice">Practice</a>
            <a href="/CourseProgress">Complete</a>
            <a href="/about">About</a>
          </nav>
          <button className="theme-toggle" onClick={toggleTheme}>
            <i className={`fa-solid ${theme === "dark-mode" ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="quiz-container">
          <div className="left-side">
            <div className="question-text">{question.question}</div>
            <div style={{ margin: "10px 0", color: "green", fontWeight: "bold" }}>
              Progress: {Math.floor(((currentQuestion + 1) / totalQuestions) * 100)}%
            </div>
            <div id="feedback">{feedback}</div>
            <div className="navigation">
              <button onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}>
                Previous
              </button>
              <button onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions - 1))}>
                Next
              </button>
            </div>
          </div>

          <div className="right-side">
            {question.format === "terminal" && (
              <div className="cmd-output">
                {terminalOutput.map((line, idx) => (
                  <div key={idx} className="cmd-line">{line}</div>
                ))}
              </div>
            )}

            {question.format === "terminal" ? (
              <form onSubmit={handleCommandSubmit}>
                <input
                  className="cmd-input"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type your terminal command..."
                  autoFocus
                />
              </form>
            ) : (
              <div className="code-editor">
                <CodeMirror
                  value={terminalInput}
                  height="200px"
                  extensions={[javascript()]}
                  theme={oneDark}
                  onChange={(value) => setTerminalInput(value)}
                />
                <button onClick={handleCommandSubmit} className="submit-code">
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Express;
