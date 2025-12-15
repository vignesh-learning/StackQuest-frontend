import React, { useState, useEffect } from "react";

import "./express.css";

const npmQuestions = [
  {
    type: "choose",
    question: "Which of the following installs a package as a dev dependency?",
    options: [
      "npm install package-name",
      "npm install --save-dev package-name",
      "npm update package-name"
    ],
    correct: 1
  },
  {
    type: "checkbox",
    question: "Which of the following are valid npm commands?",
    options: ["npm install", "npm delete", "npm run", "npm init"],
    correct: [0, 2, 3]
  },
  {
    type: "checkbox",
    question: "Which files are commonly found in an npm project?",
    options: ["package.json", "node_modules", "index.html", "package-lock.json"],
    correct: [0, 1, 3]
  },
  {
    type: "checkbox",
    question: "Which commands install dependencies in a project?",
    options: ["npm install", "npm i", "npm start", "npm init"],
    correct: [0, 1]
  },
  {
    type: "checkbox",
    question: "Which are development dependencies?",
    options: ["eslint", "jest", "nodemon", "react"],
    correct: [0, 1, 2]
  },
  {
    type: "checkbox",
    question: "What can you do using npm scripts?",
    options: ["Run build tools", "Run tests", "Launch server", "Install npm"],
    correct: [0, 1, 2]
  },
  {
    type: "checkbox",
    question: "Which of the following commands are used to uninstall a package?",
    options: ["npm uninstall", "npm remove", "npm delete", "npm purge"],
    correct: [0, 1]
  },
  {
    type: "checkbox",
    question: "What are the purposes of package.json?",
    options: [
      "Define project metadata",
      "List dependencies",
      "Store user login credentials",
      "Define npm scripts"
    ],
    correct: [0, 1, 3]
  },
  {
    type: "checkbox",
    question: "Which npm commands are useful for security checks?",
    options: ["npm audit", "npm audit fix", "npm login", "npm install"],
    correct: [0, 1]
  },
  {
    type: "checkbox",
    question: "What are valid ways to install a package globally?",
    options: [
      "npm install -g nodemon",
      "npm i -g express",
      "npm add global typescript",
      "npm install --global eslint"
    ],
    correct: [0, 1, 3]
  },
  {
    type: "checkbox",
    question: "Which of the following are valid ways to run scripts from package.json?",
    options: [
      "npm start",
      "npm run dev",
      "npm execute build",
      "npm test"
    ],
    correct: [0, 1, 3]
  },
   {
    type: "code",
    question: "Check the installed version of npm.",
    expected: "npm -v" 
  },
  {
    type: "code",
    question: "Initialize a new Node.js project with default settings.",
    expected: "npm init -y" 
  },
  {
    type: "code",
    question: "Install the Express package.",
    expected: "npm install express" 
  },
  {
    type: "code",
    question: "Install dependencies listed in package.json.",
    expected: "npm install" 
  },
  {
    type: "code",
    question: "Install a package using short form.",
    expected: "npm i axios"
  },
  {
    type: "code",
    question: "Uninstall a package from your project.",
    expected: "npm uninstall express" 
  },
  {
    type: "code",
    question: "Update a specific package.",
    expected: "npm update express" 
  },
  {
    type: "code",
    question: "Install clean dependencies from lock file.",
    expected: "npm ci" 
  },
  {
    type: "code",
    question: "Create a symlink to use a local package globally.",
    expected: "npm link"
  },
  {
    type: "code",
    question: "Rebuild native add-ons in node_modules.",
    expected: "npm rebuild" 
  },
  {
    type: "code",
    question: "Remove duplicated packages in node_modules.",
    expected: "npm dedupe" 
  },
  {
    type: "code",
    question: "Run a custom script defined in package.json.",
    expected: "npm run build"
  },
  {
    type: "code",
    question: "Run test script defined in package.json.",
    expected: "npm test"
  },
  {
    type: "code",
    question: "Start your app using npm.",
    expected: "npm start" 
  },
  {
    type: "code",
    question: "Stop the running npm process (if defined).",
    expected: "npm stop" 
  },
  {
    type: "code",
    question: "List installed dependencies.",
    expected: "npm list" 
  },
  {
    type: "code",
    question: "List installed dependencies (alias).",
    expected: "npm ls" 
  },
  {
    type: "code",
    question: "Check which packages are outdated.",
    expected: "npm outdated"
  },
  {
    type: "code",
    question: "View detailed info about a package.",
    expected: "npm info express" 
  },
  {
    type: "code",
    question: "Get help with npm commands.",
    expected: "npm help" 
  },
  {
    type: "code",
    question: "Search for a package in the npm registry.",
    expected: "npm search express" 
  },
  {
    type: "code",
    question: "View info about a specific version of a package.",
    expected: "npm view react@18.2.0"
  },
  {
    type: "code",
    question: "Publish your package to npm registry.",
    expected: "npm publish" 
  },
  {
    type: "code",
    question: "Unpublish a package (use with caution).",
    expected: "npm unpublish" 
  },
  {
    type: "code",
    question: "Log in to your npm account.",
    expected: "npm login" 
  },
  {
    type: "code",
    question: "Log out of your npm account.",
    expected: "npm logout"
  },
  {
    type: "code",
    question: "Show the currently logged-in user.",
    expected: "npm whoami" 
  },
  {
    type: "code",
    question: "Manage access to your npm package.",
    expected: "npm access grant read-only user package-name" 
  },
  {
    type: "code",
    question: "Manage teams for organization packages.",
    expected: "npm team create my-org:devs" 
  },
  {
    type: "code",
    question: "Manage npm organization.",
    expected: "npm org set my-org profile" 
  },
  {
    type: "code",
    question: "Check your project for security vulnerabilities.",
    expected: "npm audit"
  },
  {
    type: "code",
    question: "Automatically fix vulnerabilities.",
    expected: "npm audit fix"
  },
  {
    type: "code",
    question: "Check your environment setup for problems.",
    expected: "npm doctor" 
  },
  {
    type: "code",
    question: "Inspect and manage npm cache.",
    expected: "npm cache verify"
  },
  {
    type: "code",
    question: "Clear the npm cache.",
    expected: "npm cache clean --force" 
  },
  {
    type: "code",
    question: "View or set npm configurations.",
    expected: "npm config list" 
  },
  {
    type: "code",
    question: "Remove unused packages from node_modules.",
    expected: "npm prune"
  },
  {
    type: "code",
    question: "Update the version number in package.json.",
    expected: "npm version patch" 
  }
];
function Node() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [theme, setTheme] = useState("dark-mode");

  const question = npmQuestions[currentQuestionIndex];
  const totalQuestions = npmQuestions.length;

  useEffect(() => {
    const progress = Math.floor(((currentQuestionIndex + 1) / totalQuestions) * 100);
    localStorage.setItem("course_node_progress", progress);

    setFeedback("");
    setSelectedOptions([]);
  }, [currentQuestionIndex]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  const nextQuestion = () => {
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        localStorage.setItem("course_node_progress", "100");
        localStorage.setItem("course_node_completed", "true");
        alert("🎉 Congratulations! You completed the Node.js course!");
        window.location.href = "/complete";
      }
    }, 1500);
  };

  const arraysMatch = (a, b) =>
    a.length === b.length && a.sort().every((val, i) => val === b.sort()[i]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const input = terminalInput.trim();

    if (!input) return;

    setTerminalOutput((prev) => [...prev, `> ${input}`]);
    setTerminalInput("");

    if (input === question.expected) {
      setFeedback("✅ Correct!");
      nextQuestion();
    } else {
      setFeedback("❌ Incorrect command. Try again.");
    }
  };

  const handleChooseAnswer = (index) => {
    if (index === question.correct) {
      setFeedback("✅ Correct!");
      nextQuestion();
    } else {
      setFeedback("❌ Wrong answer.");
    }
  };

  const handleCheckboxChange = (index) => {
    setSelectedOptions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCheckboxSubmit = () => {
    if (arraysMatch(selectedOptions, question.correct)) {
      setFeedback("✅ Correct!");
      nextQuestion();
    } else {
      setFeedback("❌ Try again.");
    }
  };

  // ✅ FIXED — Added missing functions
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

 const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      localStorage.setItem("course_node_completed", "true");
      localStorage.setItem("course_node_progress", "100");

      alert("🎉 Congratulations! You completed the Node course!");

      window.location.href = "/complete";
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
            <div className="question-text">{question.question}</div>

            <div style={{ margin: "10px 0", color: "lime", fontWeight: "bold" }}>
              Progress: {Math.floor(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
            </div>

            <div id="feedback">{feedback}</div>

            <div className="navigation">
              <button onClick={handlePrevious}>Previous</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>

          <div className="right-side">

            {question.type === "choose" && (
              <div className="options-section">
                {question.options.map((opt, idx) => (
                  <button
                    key={idx}
                    className="option-btn"
                    onClick={() => handleChooseAnswer(idx)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {question.type === "checkbox" && (
              <div className="options-section">
                <div className="option-instruction">Pick the correct options:</div>

                {question.options.map((opt, idx) => (
                  <label key={idx} className="option-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(idx)}
                      onChange={() => handleCheckboxChange(idx)}
                    />
                    {opt}
                  </label>
                ))}

                <button className="submit-checkbox" onClick={handleCheckboxSubmit}>
                  Submit
                </button>
              </div>
            )}

            {question.type === "code" && (
              <>
                <div className="cmd-output">
                  {terminalOutput.map((line, idx) => (
                    <div key={idx} className="cmd-line">{line}</div>
                  ))}
                </div>

                <form onSubmit={handleCommandSubmit}>
                  <input
                    className="cmd-input"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type a command like: npm -v"
                    autoFocus
                  />
                </form>
              </>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}

export default Node;
