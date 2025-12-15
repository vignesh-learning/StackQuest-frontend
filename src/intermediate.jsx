import React, { useEffect, useState } from "react";
import "./intermediate.css";

import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

const intermediateCSSQuestions = [
  {
    type: "checkbox",
    question: "Which CSS properties are used in flexbox layout?",
    options: ["display", "justify-content", "align-items", "flex-direction"],
    correct: [0, 1, 2, 3]
  },
  {
    type: "checkbox",
    question: "Which values are valid for the 'position' property?",
    options: ["static", "absolute", "fixed", "sticky"],
    correct: [0, 1, 2, 3]
  },
  {
    type: "checkbox",
    question: "Which of the following are pseudo-classes in CSS?",
    options: [":hover", ":before", ":nth-child()", ":active"],
    correct: [0, 2, 3]
  },
  {
    type: "checkbox",
    question: "Which are valid ways to apply gradients in CSS?",
    options: ["linear-gradient", "radial-gradient", "background-gradient", "angle-gradient"],
    correct: [0, 1]
  },
  {
    type: "code",
    question: "Write CSS to center a div using flexbox.",
    starterCode: `div {\n  /* Your code here */\n}`,
    correctCode: `div {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`
  },
  {
    type: "code",
    question: "Create a class '.box' with a solid red 2px border and 20px padding.",
    starterCode: `.box {\n  \n}`,
    correctCode: `.box {\n  border: 2px solid red;\n  padding: 20px;\n}`
  },
  {
    type: "checkbox",
    question: "Which properties control the size of elements in CSS?",
    options: ["width", "height", "max-width", "min-height"],
    correct: [0, 1, 2, 3]
  },
  {
    type: "code",
    question: "Write CSS for a responsive image that adjusts width to 100% of its container.",
    starterCode: `img {\n  \n}`,
    correctCode: `img {\n  width: 100%;\n  height: auto;\n}`
  },
  {
    type: "checkbox",
    question: "Which of these are transition-related properties in CSS?",
    options: ["transition", "transition-duration", "transition-delay", "transition-fade"],
    correct: [0, 1, 2]
  },
  {
    type: "code",
    question: "Write CSS to hide an element with the class '.hidden'.",
    starterCode: `.hidden {\n  \n}`,
    correctCode: `.hidden {\n  display: none;\n}`
  },
  {
    type: "checkbox",
    question: "Which units are relative in CSS?",
    options: ["em", "rem", "%", "vh"],
    correct: [0, 1, 2, 3]
  },
  {
    type: "code",
    question: "Write CSS for a hover effect that changes background color to yellow.",
    starterCode: `button:hover {\n  \n}`,
    correctCode: `button:hover {\n  background-color: yellow;\n}`
  },
  {
    type: "checkbox",
    question: "Which of the following values can be used for the 'display' property?",
    options: ["inline-block", "grid", "none", "center"],
    correct: [0, 1, 2]
  },
  {
    type: "code",
    question: "Write a CSS rule to apply a 1-second ease-in transition on 'opacity'.",
    starterCode: `div {\n  \n}`,
    correctCode: `div {\n  transition: opacity 1s ease-in;\n}`
  },
  {
    type: "checkbox",
    question: "Which CSS properties are used for grid layout?",
    options: ["display: grid", "grid-template-columns", "grid-gap", "flex-grow"],
    correct: [0, 1, 2]
  }
];

function IntermediateCSS() {
  const [theme, setTheme] = useState("dark-mode");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [code, setCode] = useState("");

  const currentQuestion = intermediateCSSQuestions[currentQuestionIndex];
  const totalQuestions = intermediateCSSQuestions.length;

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

    // ✅ Save progress percentage
    const progress = Math.floor(((currentQuestionIndex + 1) / totalQuestions) * 100);
    localStorage.setItem("css_stage2_progress", progress);
  }, [currentQuestionIndex, totalQuestions, currentQuestion.starterCode]);

  const handleCheckboxChange = (index) => {
    setSelectedOptions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const validateCheckboxAnswer = () => {
    const correct = currentQuestion.correct;
    const isCorrect =
      correct.length === selectedOptions.length &&
      correct.every((val) => selectedOptions.includes(val));
    setFeedback(isCorrect ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const validateCodeAnswer = () => {
    const user = code.trim().replace(/\s+/g, "");
    const expected = currentQuestion.correctCode?.trim().replace(/\s+/g, "") || "";
    setFeedback(user === expected ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // ✅ When course finished
      localStorage.setItem("css_stage2_completed", "true");
      localStorage.setItem("css_stage2_progress", "100");
      alert("🎉 Congratulations! You completed Intermediate CSS!");
      window.location.href = "/css"; // Redirect to certificate page
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((prev) => prev - 1);
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

            {/* ✅ Progress display */}
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
            {currentQuestion.type === "checkbox" ? (
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
            ) : (
              <div id="codeEditorContainer">
                <CodeMirror
                  value={code}
                  height="200px"
                  theme={oneDark}
                  extensions={[css()]}
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

export default IntermediateCSS;
