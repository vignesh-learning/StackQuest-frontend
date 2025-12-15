import React, { useEffect, useState } from "react";
import "./intermediate.css";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

const advancedCSSQuestions = [
  {
    type: "code",
    question: "Write CSS to create a linear gradient from red to blue.",
    starterCode: `body {\n }`,
    correctCode: `body { background: linear-gradient(red, blue); }`
  },
  {
    type: "code",
    question: "Write CSS to make all <p> elements use a CSS variable for color named --main-color.",
    starterCode: `p {\n  \n}`,
    correctCode: `p { color: var(--main-color); }`
  },
  {
    type: "code",
    question: "Write CSS to animate a div to fade in using opacity over 2s.",
    starterCode: `div {\n  \n}`,
    correctCode: `div { animation: fadein 2s; } @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }`
  },
  {
    type: "code",
    question: "Write CSS to center a div horizontally and vertically using flexbox.",
    starterCode: `body {\n  \n}`,
    correctCode: `body { display: flex; justify-content: center; align-items: center; height: 100vh; }`
  },
  {
    type: "code",
    question: "Write CSS to create a circular button with 50px diameter.",
    starterCode: `button {\n  \n}`,
    correctCode: `button { width: 50px; height: 50px; border-radius: 50%; }`
  },
  {
    type: "code",
    question: "Write CSS to apply a shadow to all elements with class .card.",
    starterCode: `.card {\n  \n}`,
    correctCode: `.card { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }`
  },
  {
    type: "code",
    question: "Write CSS to apply a blur filter of 5px to an image.",
    starterCode: `img {\n  \n}`,
    correctCode: `img { filter: blur(5px); }`
  },
  {
    type: "code",
    question: "Write CSS to style a button that changes color on hover.",
    starterCode: `button:hover {\n  \n}`,
    correctCode: `button:hover { background-color: green; }`
  },
  {
    type: "code",
    question: "Write CSS to make a div fixed at the bottom right corner.",
    starterCode: `div {\n  \n}`,
    correctCode: `div { position: fixed; bottom: 0; right: 0; }`
  },
  {
    type: "code",
    question: "Write CSS to hide an element but keep it in the DOM.",
    starterCode: `.hidden {\n  \n}`,
    correctCode: `.hidden { visibility: hidden; }`
  },
  {
    type: "code",
    question: "Write CSS to only apply styles to screen sizes less than 600px.",
    starterCode: `@media {\n  \n}`,
    correctCode: `@media (max-width: 600px) { body { font-size: 14px; } }`
  },
  {
    type: "code",
    question: "Write CSS to make a square div with gradient and rounded corners.",
    starterCode: `div {\n  \n}`,
    correctCode: `div { width: 100px; height: 100px; background: linear-gradient(#f00, #00f); border-radius: 10px; }`
  },
  {
    type: "code",
    question: "Write CSS to make all <h1> text uppercase and spaced 2px.",
    starterCode: `h1 {\n  \n}`,
    correctCode: `h1 { text-transform: uppercase; letter-spacing: 2px; }`
  },
  {
    type: "code",
    question: "Write CSS to scale an image to 1.2x on hover smoothly.",
    starterCode: `img:hover {\n  \n}`,
    correctCode: `img:hover { transform: scale(1.2); transition: transform 0.3s; }`
  },
  {
    type: "code",
    question: "Write CSS to add a dotted underline to links.",
    starterCode: `a {\n  \n}`,
    correctCode: `a { text-decoration: underline dotted; }`
  },
  {
    type: "code",
    question: "Write CSS to give alternating rows in a table a gray background.",
    starterCode: `tr:nth-child(even) {\n  \n}`,
    correctCode: `tr:nth-child(even) { background-color: #eee; }`
  },
  {
    type: "code",
    question: "Write CSS to animate the width of a box from 100px to 300px.",
    starterCode: `.box {\n  \n}`,
    correctCode: `.box { animation: grow 2s forwards; } @keyframes grow { from { width: 100px; } to { width: 300px; } }`
  },
  {
    type: "code",
    question: "Write CSS to add a gradient border around a div.",
    starterCode: `div {\n  \n}`,
    correctCode: `div { border: 5px solid transparent; border-image: linear-gradient(red, blue) 1; }`
  },
  {
    type: "code",
    question: "Write CSS to make a navbar fixed to the top with 100% width.",
    starterCode: `.navbar {\n  \n}`,
    correctCode: `.navbar { position: fixed; top: 0; width: 100%; }`
  },
  {
    type: "code",
    question: "Write a responsive square grid layout using CSS Grid.",
    starterCode: `grid {\n  \n}`,
    correctCode: `.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; }`
  }
];

function AdvancedCSS() {
  const [theme, setTheme] = useState("dark-mode");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [code, setCode] = useState("");
  const [previewContent, setPreviewContent] = useState("");

  const currentQuestion = advancedCSSQuestions[currentQuestionIndex];
  const totalQuestions = advancedCSSQuestions.length;

  const toggleTheme = () => setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));

  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    setFeedback("");
    setCode(currentQuestion.starterCode || "");
    setPreviewContent("");

    // ✅ Save progress
    const progress = Math.floor(((currentQuestionIndex + 1) / totalQuestions) * 100);
    localStorage.setItem("css_stage3_progress", progress);
  }, [currentQuestionIndex, totalQuestions, currentQuestion.starterCode]);

  const validateCodeAnswer = () => {
    const user = code.trim().replace(/\s+/g, "");
    const expected = currentQuestion.correctCode?.trim().replace(/\s+/g, "") || "";
    setFeedback(user === expected ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const handleRun = () => setPreviewContent(`<style>${code}</style>`);

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // ✅ When course finished
      localStorage.setItem("css_stage3_completed", "true");
      localStorage.setItem("css_stage3_progress", "100");
      alert("🎉 Congratulations! You completed Advanced CSS!");
      window.location.href = "/complete"; 
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
            <div id="codeEditorContainer">
              <CodeMirror
                value={code}
                height="200px"
                theme={oneDark}
                extensions={[css()]}
                onChange={(value) => setCode(value)}
              />
              <button onClick={handleRun}>Run Code</button>
              <button onClick={validateCodeAnswer}>Submit Code</button>
              <iframe
                title="CSS Preview"
                id="previewFrame"
                style={{ width: "100%", height: "100px", marginTop: "10px", border: "1px solid #ccc" }}
                srcDoc={previewContent}
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdvancedCSS;
