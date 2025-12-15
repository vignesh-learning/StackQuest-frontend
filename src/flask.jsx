import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./graphQL.css";

const flaskOptionQuestions = [
  {
    type: "checkbox",
    question: "Which of the following are features of Flask?",
    options: [
      { text: "Lightweight and minimalistic", correct: true },
      { text: "Built-in ORM", correct: false },
      { text: "Supports Jinja2 templates", correct: true },
      { text: "Follows WSGI standard", correct: true },
    ],
  },
  {
    type: "checkbox",
    question: "Which of the following commands can be used to install Flask?",
    options: [
      { text: "`pip install flask`", correct: true },
      { text: "`npm install flask`", correct: false },
      { text: "`conda install flask`", correct: true },
      { text: "`apt-get install flask`", correct: false },
    ],
  },
   {
    type: "checkbox",
    question: "What are the roles of Flask’s `app.route` decorator?",
    options: [
      { text: "Maps a URL to a view function", correct: true },
      { text: "Automatically validates data", correct: false },
      { text: "Specifies HTTP methods allowed", correct: true },
      { text: "Registers the route with the app", correct: true },
    ],
  },
  {
    type: "checkbox",
    question: "Which of the following are true about Flask templates?",
    options: [
      { text: "They are written using Jinja2", correct: true },
      { text: "They can include control structures like if/for", correct: true },
      { text: "They are written in JavaScript", correct: false },
      { text: "They can extend base templates", correct: true },
    ],
  },
  {
    type: "checkbox",
    question: "Which of the following are common Flask HTTP methods?",
    options: [
      { text: "GET", correct: true },
      { text: "POST", correct: true },
      { text: "PUT", correct: true },
      { text: "FETCH", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of the following are true about Flask’s debug mode?",
    options: [
      { text: "Reloads server automatically on code changes", correct: true },
      { text: "Shows detailed error messages", correct: true },
      { text: "Improves production performance", correct: false },
      { text: "Can be enabled by `app.run(debug=True)`", correct: true },
    ],
  },
  {
    type: "checkbox",
    question: "Which Flask extensions are used for databases?",
    options: [
      { text: "Flask-SQLAlchemy", correct: true },
      { text: "Flask-Admin", correct: false },
      { text: "Flask-Migrate", correct: true },
      { text: "Flask-Mail", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are advantages of Flask over Django?",
    options: [
      { text: "More lightweight and flexible", correct: true },
      { text: "Has built-in ORM", correct: false },
      { text: "Easy to learn for beginners", correct: true },
      { text: "Provides built-in admin panel", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which statements are true about Flask sessions?",
    options: [
      { text: "They are client-side", correct: true },
      { text: "They are stored in cookies", correct: true },
      { text: "They use a secret key for signing", correct: true },
      { text: "They are disabled by default", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of the following are Flask CLI commands?",
    options: [
      { text: "`flask run`", correct: true },
      { text: "`flask shell`", correct: true },
      { text: "`flask db migrate`", correct: true },
      { text: "`flask build`", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of the following are Flask HTTP status codes?",
    options: [
      { text: "200 OK", correct: true },
      { text: "404 Not Found", correct: true },
      { text: "500 Internal Server Error", correct: true },
      { text: "999 Unknown", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which template features are provided by Jinja2?",
    options: [
      { text: "Variables", correct: true },
      { text: "Loops", correct: true },
      { text: "Filters", correct: true },
      { text: "Compiled machine code", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are valid Flask app configurations?",
    options: [
      { text: "`DEBUG = True`", correct: true },
      { text: "`SECRET_KEY`", correct: true },
      { text: "`DATABASE_URI`", correct: true },
      { text: "`REACT_MODE`", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of the following are valid Flask request attributes?",
    options: [
      { text: "`request.method`", correct: true },
      { text: "`request.args`", correct: true },
      { text: "`request.form`", correct: true },
      { text: "`request.json`", correct: true },
    ],
  },
  {
    type: "checkbox",
    question: "Which Flask objects are global proxies?",
    options: [
      { text: "request", correct: true },
      { text: "session", correct: true },
      { text: "g", correct: true },
      { text: "window", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are Flask advantages?",
    options: [
      { text: "Flexible", correct: true },
      { text: "Minimal boilerplate", correct: true },
      { text: "Scalable", correct: true },
      { text: "Requires Java by default", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are Flask request contexts?",
    options: [
      { text: "Application context", correct: true },
      { text: "Request context", correct: true },
      { text: "Thread context", correct: false },
      { text: "Shell context", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which Flask extensions are used for authentication?",
    options: [
      { text: "Flask-Login", correct: true },
      { text: "Flask-Security", correct: true },
      { text: "Flask-Authlib", correct: true },
      { text: "Flask-SocketIO", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which Flask components are middleware related?",
    options: [
      { text: "before_request", correct: true },
      { text: "after_request", correct: true },
      { text: "teardown_request", correct: true },
      { text: "request.js", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of the following are Flask debugging tools?",
    options: [
      { text: "Debugger PIN", correct: true },
      { text: "Werkzeug debugger", correct: true },
      { text: "Chrome DevTools", correct: false },
      { text: "Flask debug toolbar", correct: true },
    ],
  },
  {
    type: "checkbox",
    question: "Which template delimiters are used in Jinja2?",
    options: [
      { text: "`{{ variable }}`", correct: true },
      { text: "`{% block %}`", correct: true },
      { text: "`<!-- comment -->`", correct: false },
      { text: "`{# comment #}`", correct: true },
    ],
  },
  {
    type: "checkbox",
    question: "Which HTTP methods can Flask handle?",
    options: [
      { text: "GET", correct: true },
      { text: "POST", correct: true },
      { text: "DELETE", correct: true },
      { text: "CONNECT", correct: true },
    ],
  },
  {
    type: "checkbox",
    question: "Which commands are used for Flask migrations?",
    options: [
      { text: "`flask db init`", correct: true },
      { text: "`flask db migrate`", correct: true },
      { text: "`flask db upgrade`", correct: true },
      { text: "`flask db rollback`", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of the following are Flask template context variables?",
    options: [
      { text: "url_for", correct: true },
      { text: "get_flashed_messages", correct: true },
      { text: "csrf_token", correct: true },
      { text: "window.alert", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are correct uses of Flask `url_for`?",
    options: [
      { text: "Generate URLs dynamically", correct: true },
      { text: "Avoid hardcoding links", correct: true },
      { text: "Redirect to another route", correct: true },
      { text: "Store data in cookies", correct: false },
    ],
  },
];

function Flask() {
  const [theme, setTheme] = useState("dark-mode");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [code, setCode] = useState("");

  const totalQuestions = flaskOptionQuestions.length;
  const currentQuestion = flaskOptionQuestions[currentIndex];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  useEffect(() => {
    setFeedback("");
    setSelectedOptions([]);
    setCode(currentQuestion?.starterCode || "");

    const progress = Math.floor(((currentIndex + 1) / totalQuestions) * 100);
    localStorage.setItem("course_flask_progress", progress);

  }, [currentIndex, currentQuestion, totalQuestions]);

  const validateCheckboxAnswer = () => {
    const correctOptions = currentQuestion.options
      .map((opt, i) => (opt.correct ? i : null))
      .filter((val) => val !== null);

    const isCorrect =
      correctOptions.length === selectedOptions.length &&
      correctOptions.every((val) => selectedOptions.includes(val));

    setFeedback(isCorrect ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const validateCodeAnswer = () => {
    const user = code.trim().replace(/\s+/g, "");
    const expected = currentQuestion.expectedAnswer
      .trim()
      .replace(/\s+/g, "");

    setFeedback(user === expected ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const handleNext = () => {
    if (currentIndex < flaskOptionQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      localStorage.setItem("course_flask_completed", "true");
      localStorage.setItem("course_flask_progress", "100");

      alert("🎉 Congratulations! You completed the JavaScript course!");

      window.location.href = "/complete";
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={theme} style={{ padding: "20px", fontFamily: "Times New Roman" }}>
      <header className="main-header" style={{ marginBottom: "20px" }}>
        <div className="header-left">
          <a href="/account">
            <i className="fa-regular fa-user"></i> Account
          </a>
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
            <div className="question-text">{currentQuestion.question}</div>
            <div
              style={{ margin: "10px 0", color: "green", fontWeight: "bold" }}
            >
              Progress:{" "}
              {Math.floor(((currentIndex + 1) / totalQuestions) * 100)}%
            </div>
            <div id="feedback">{feedback}</div>
            <div className="navigation">
              <button onClick={handlePrevious}>Previous</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>

          <div className="right-side">
            {currentQuestion.type === "checkbox" ? (
              <div id="checkboxOptions">
                <div className="option-instruction">Pick the correct options:</div>
                {currentQuestion.options.map((opt, i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(i)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSelectedOptions((prev) =>
                          checked ? [...prev, i] : prev.filter((idx) => idx !== i)
                        );
                      }}
                    />
                    {" " + opt.text}
                  </label>
                ))}
                <button onClick={validateCheckboxAnswer}>Submit Answer</button>
              </div>
            ) : (
              <div id="codeEditorContainer">
                <CodeMirror
                  value={code}
                  height="200px"
                  extensions={[javascript()]}
                  theme={oneDark}
                  onChange={(value) => setCode(value)}
                />
                <button onClick={validateCodeAnswer}>Submit Code</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Flask;
