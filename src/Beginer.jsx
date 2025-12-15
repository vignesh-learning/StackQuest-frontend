import React, { useEffect, useState } from "react";
import "./intermediate.css";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

const cssQuestions = [
  {
    type: "checkbox",
    question: "Which symbols are used in CSS selectors?",
    options: ["#", ".", "*", "@"],
    correct: [0, 1, 2],
  },
  {
    type: "checkbox",
    question: "Which of the following are valid ways to specify colors in CSS?",
    options: ["red", "#ff0000", "rgb(255,0,0)", "color-red"],
    correct: [0, 1, 2],
  },
  {
    type: "checkbox",
    question: "Which CSS units are relative?",
    options: ["em", "rem", "%", "px"],
    correct: [0, 1, 2]
  },
  {
    type: "checkbox",
    question: "Which properties are used to style text in CSS?",
    options: ["font-weight", "text-align", "text-decoration", "border"],
    correct: [0, 1, 2]
  },
  {
    type: "checkbox",
    question: "What parts are included in the CSS box model?",
    options: ["Content", "Padding", "Border", "Margin"],
    correct: [0, 1, 2, 3]
  },
  {
    type: "checkbox",
    question: "Which properties are used to style backgrounds?",
    options: ["background-color", "background-image", "background-repeat", "background-shadow"],
    correct: [0, 1, 2]
  },
  {
    type: "checkbox",
    question: "Which properties can be used to create borders?",
    options: ["border", "border-radius", "border-color", "outline"],
    correct: [0, 1, 2, 3]
  },
  {
    type: "checkbox",
    question: "Which display values are commonly used in CSS?",
    options: ["block", "inline", "flex", "hidden"],
    correct: [0, 1, 2]
  },
  {
    type: "checkbox",
    question: "What does the `opacity` property affect?",
    options: ["Transparency", "Visibility", "Text color", "Element height"],
    correct: [0]
  },
  {
    type: "checkbox",
    question: "Which CSS properties can affect layout and spacing?",
    options: ["margin", "padding", "width", "font-style"],
    correct: [0, 1, 2]
  }
];

function Beginer() {
  const [theme, setTheme] = useState("dark-mode");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [code, setCode] = useState("");

  const currentQuestion = cssQuestions[currentQuestionIndex];
  const totalQuestions = cssQuestions.length; // ✅ Fix undefined

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    setSelectedOptions([]);
    setFeedback("");
    setCode(currentQuestion.starterCode || "");

    // Save progress
    const progress = Math.floor(((currentQuestionIndex + 1) / totalQuestions) * 100);
    localStorage.setItem("css_stage1_progress", progress);
  }, [currentQuestionIndex, currentQuestion.starterCode]);

  const handleCheckboxChange = (index) => {
    setSelectedOptions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const validateCheckboxAnswer = () => {
    const correct = currentQuestion.correct;
    const isCorrect =
      correct.length === selectedOptions.length &&
      correct.every((val) => selectedOptions.includes(val));
    setFeedback(isCorrect ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Complete stage 1
      localStorage.setItem("css_stage1_completed", "true");
      localStorage.setItem("css_stage1_progress", "100");
      alert("🎉 Congratulations! You completed Beginner CSS!");
      window.location.href = "/css"; // or navigate to Complete page
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
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
            <div className="question-text">{currentQuestion.question}</div>

            <div style={{ margin: "10px 0", color: "green", fontWeight: "bold" }}>
              Progress: {Math.floor(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
            </div>

            <div id="feedback">{feedback}</div>
            <div className="navigation">
              <button onClick={handlePrevious}>Previous</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>

          <div className="right-side">
            {currentQuestion.type === "checkbox" && (
              <div id="checkboxOptions">
                <div className="option-instruction">Pick the correct options:</div>
                {currentQuestion.options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    {option}
                  </label>
                ))}
                <button onClick={validateCheckboxAnswer}>Submit Answer</button>
              </div>
            )}

            {currentQuestion.type === "code" && (
              <div id="codeEditorContainer">
                <CodeMirror
                  value={code}
                  height="200px"
                  theme={oneDark}
                  extensions={[css()]}
                  onChange={(value) => setCode(value)}
                />
                <button
                  onClick={() => {
                    const user = code.trim().replace(/\s+/g, "");
                    const expected = currentQuestion.correctCode?.trim().replace(/\s+/g, "") || "";
                    setFeedback(
                      user === expected
                        ? "✅ Correct Answer!"
                        : "❌ Incorrect. Try again."
                    );
                  }}
                >
                  Submit Code
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Beginer;
