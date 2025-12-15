import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import "./Html.css";

const questions = [
  {
    type: "checkbox",
    question: "Which of the following are programming languages?",
    options: ["HTML", "Python", "JavaScript", "CSS"],
    correct: [1, 2],
  },
  {
    type: "checkbox",
    question: "Which of the following are valid HTML tags?",
    options: ["<div>", "<section>", "<script>", "<stylee>"],
    correct: [0, 1, 2],
  },
  {
    type: "code",
    question: "Create a simple HTML page with a title and a paragraph.",
    starterCode: `<!-- Write your code below -->`,
    correctCode: `<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <p>This is my first paragraph.</p>
  </body>
</html>`,
  },
  {
    type: "checkbox",
    question: "Which elements are used for HTML lists?",
    options: ["<ul>", "<li>", "<ol>", "<list>"],
    correct: [0, 1, 2],
  },
  {
    type: "code",
    question: "Write HTML code to create an unordered list with three items.",
    starterCode: `<!-- List your items here -->`,
    correctCode: `<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>`,
  },
  {
    type: "code",
    question: "Write HTML code to create a form with a text input and a submit button.",
    starterCode: `<!-- Write your form here -->`,
    correctCode: `<form>
  <input type="text" name="username">
  <button type="submit">Submit</button>
</form>`,
  },
  {
    type: "checkbox",
    question: "Which tags are used for text formatting in HTML?",
    options: ["<b>", "<i>", "<strong>", "<em>"],
    correct: [0, 1, 2, 3],
  },
  {
    type: "checkbox",
    question: "Which of the following are HTML input types?",
    options: ["text", "date", "checkbox", "picker"],
    correct: [0, 1, 2],
  },
  {
    type: "checkbox",
    question: "Which of the following tags are semantic HTML tags?",
    options: ["<header>", "<footer>", "<article>", "<bold>"],
    correct: [0, 1, 2],
  },
  {
    type: "checkbox",
    question: "Which HTML tags can embed media content?",
    options: ["<audio>", "<video>", "<source>", "<script>"],
    correct: [0, 1, 2],
  },
  {
    type: "checkbox",
    question: "Which of these are valid table-related tags?",
    options: ["<table>", "<thead>", "<tr>", "<tbl>"],
    correct: [0, 1, 2],
  },
  {
    type: "checkbox",
    question: "Which are void (self-closing) tags in HTML?",
    options: ["<br>", "<hr>", "<img>", "<span>"],
    correct: [0, 1, 2],
  },
  {
    type: "code",
    question: "Write HTML code to create a heading that says 'Hello World'.",
    correctCode: "<h1>Hello World</h1>",
  },
];

function Html() {
  const [theme, setTheme] = useState("dark-mode");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [code, setCode] = useState("");

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  // ✅ DAILY STREAK FUNCTION
  const markProblemSolvedToday = () => {
    const today = new Date().toISOString().split("T")[0];

    const data = JSON.parse(localStorage.getItem("dailyStreak")) || {
      streak: 0,
      lastSolvedDate: null,
      history: [],
    };

    if (data.lastSolvedDate !== today) {
      data.streak += 1;
      data.lastSolvedDate = today;
      data.history.push(today);

      localStorage.setItem("dailyStreak", JSON.stringify(data));
    }
  };

  useEffect(() => {
    setFeedback("");
    setSelectedOptions([]);
    setCode(currentQuestion.starterCode || "");

    const progress = Math.floor(((currentIndex + 1) / totalQuestions) * 100);
    localStorage.setItem("course_html_progress", progress);
  }, [currentIndex, totalQuestions, currentQuestion.starterCode]);

  // ✅ CHECKBOX VALIDATION (FIXED)
  const validateCheckboxAnswer = () => {
    const correct = currentQuestion.correct;
    const isCorrect =
      correct.length === selectedOptions.length &&
      correct.every((val) => selectedOptions.includes(val));

    if (isCorrect) {
      setFeedback("✅ Correct Answer!");
      markProblemSolvedToday();
    } else {
      setFeedback("❌ Incorrect. Try again.");
    }
  };

  // ✅ CODE VALIDATION (FIXED)
  const validateCodeAnswer = () => {
    const user = code.trim().replace(/\s+/g, "");
    const expected = currentQuestion.correctCode.trim().replace(/\s+/g, "");

    if (user === expected) {
      setFeedback("✅ Correct Answer!");
      markProblemSolvedToday();
    } else {
      setFeedback("❌ Incorrect. Try again.");
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      localStorage.setItem("course_html_completed", "true");
      localStorage.setItem("course_html_progress", "100");

      alert("🎉 Congratulations! You completed the HTML course!");
      window.location.href = "/complete";
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={theme}>
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
          <button className="theme-toggle" onClick={toggleTheme}>
            <i className={`fa-solid ${theme === "dark-mode" ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="quiz-container">
          <div className="left-side">
            <div className="question-text">{currentQuestion.question}</div>

            <div style={{ margin: "10px 0", color: "green", fontWeight: "bold" }}>
              Progress: {Math.floor(((currentIndex + 1) / totalQuestions) * 100)}%
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
                    {" " + opt}
                  </label>
                ))}
                <button onClick={validateCheckboxAnswer}>Submit Answer</button>
              </div>
            ) : (
              <div id="codeEditorContainer">
                <CodeMirror
                  value={code}
                  height="200px"
                  extensions={[html()]}
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

export default Html;
