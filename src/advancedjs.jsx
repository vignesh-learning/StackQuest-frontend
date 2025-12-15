import React, { useState, useEffect } from "react";
import "./intermediate.css";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

// You can move this to a separate file if needed
const JSQuestions = [ 
  {
    type: "checkbox",
    question: "Which of the following are true about closures in JavaScript?",
    options: [
      "Closures can access outer function variables",
      "Closures are only used in async programming",
      "Closures help preserve state",
      "Closures don't work with arrow functions"
    ],
    correct: [0, 2],
    code: `function outer() { let count = 0; return function inner() { count++; return count; }; }`
  },
  {
    type: "checkbox",
    question: "Which of these are valid ES6+ features?",
    options: ["let & const", "template literals", "var hoisting", "arrow functions"],
    correct: [0, 1, 3],
    code: `const greet = name => \`Hello, \${name}\`;`
  },
  {
    type: "code",
    question: "Write a function that returns a Promise which resolves after 1 second.",
    correctCode: `function waitOneSecond() { return new Promise(resolve => setTimeout(resolve, 1000)); }`
  },
  {
    type: "code",
    question: "Create a class 'Person' with a constructor that takes name and age, and a method 'greet'.",
    correctCode: `class Person { constructor(name, age) { this.name = name; this.age = age; } greet() { return \`Hi, I'm \${this.name}\`; } }`
  },
  {
    type: "checkbox",
    question: "Which of these are valid async JavaScript patterns?",
    options: ["async/await", "callbacks", "threads", "promises"],
    correct: [0, 1, 3],
    code: `async function fetchData() { const res = await fetch('/api'); }`
  },
  {
    type: "code",
    question: "Write a function that takes a number array and returns only even numbers.",
    correctCode: `function filterEvens(arr) { return arr.filter(n => n % 2 === 0); }`
  },
  {
    type: "checkbox",
    question: "Which methods mutate the original array?",
    options: ["map", "filter", "sort", "push"],
    correct: [2, 3],
    code: `let arr = [3, 1, 2]; arr.sort(); arr.push(4);`
  },
  {
    type: "code",
    question: "Write a function to flatten a nested array using recursion.",
    correctCode: `function flatten(arr) { return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []); }`
  },
  {
    type: "checkbox",
    question: "Which of the following are valid ways to clone an object?",
    options: ["Object.assign({}, obj)", "{...obj}", "obj.clone()", "JSON.parse(JSON.stringify(obj))"],
    correct: [0, 1, 3],
    code: `const copy = { ...original };`
  },
  {
    type: "code",
    question: "Create a function to debounce another function.",
    correctCode: `function debounce(fn, delay) { let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => fn.apply(this, args), delay); }; }`
  },
  {
    type: "checkbox",
    question: "Which of the following are methods available on the Math object?",
    options: ["Math.floor", "Math.random", "Math.slice", "Math.max"],
    correct: [0, 1, 3],
    code: `Math.floor(2.9); Math.max(3, 7);`
  },
  {
    type: "code",
    question: "Write a function that removes duplicates from an array.",
    correctCode: `function removeDuplicates(arr) { return [...new Set(arr)]; }`
  },
  {
    type: "checkbox",
    question: "Which of the following are valid types in JavaScript?",
    options: ["symbol", "bigint", "integer", "undefined"],
    correct: [0, 1, 3],
    code: `typeof Symbol(); typeof 10n;`
  },
  {
    type: "code",
    question: "Create a function to generate a random integer between 1 and 10.",
    correctCode: `function getRandomInt() { return Math.floor(Math.random() * 10) + 1; }`
  },
  {
    type: "checkbox",
    question: "Which of these are types of errors in JavaScript?",
    options: ["ReferenceError", "TypeError", "LogicError", "SyntaxError"],
    correct: [0, 1, 3],
    code: `try { x(); } catch(e) { console.log(e.name); }`
  },
  {
    type: "code",
    question: "Write a function that counts how many times a word appears in a string.",
    correctCode: `function countWord(str, word) { return str.split(' ').filter(w => w === word).length; }`
  },
  {
    type: "code",
    question: "Write a function that merges two objects.",
    correctCode: `function mergeObjects(a, b) { return { ...a, ...b }; }`
  },
  {
    type: "code",
    question: "Write a function that filters out null and undefined values from an array.",
    correctCode: `function cleanArray(arr) { return arr.filter(val => val != null); }`
  },
  {
    type: "code",
    question: "Write a function to check if a number is divisible by 3 and 5.",
    correctCode: `function isDivisible(num) { return num % 3 === 0 && num % 5 === 0; }`
  },
  {
    type: "code",
    question: "Create a function that returns the factorial of a number.",
    correctCode: `function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }`
  },
  {
    type: "code",
    question: "Write a function to reverse a string.",
    correctCode: `function reverseString(str) { return str.split('').reverse().join(''); }`
  },
  {
    type: "code",
    question: "Write a function that checks if a string is a palindrome.",
    correctCode: `function isPalindrome(str) { const rev = str.split('').reverse().join(''); return rev === str; }`
  },
  {
    type: "code",
    question: "Write a function that returns the largest number in an array.",
    correctCode: `function maxInArray(arr) { return Math.max(...arr); }`
  },
  {
    type: "code",
    question: "Write a function that removes all falsy values from an array.",
    correctCode: `function removeFalsy(arr) { return arr.filter(Boolean); }`
  },
  {
    type: "code",
    question: "Create a function that returns an array of only unique values.",
    correctCode: `function uniqueValues(arr) { return [...new Set(arr)]; }`
  },
  {
    type: "code",
    question: "Write a function that returns the sum of numbers from 1 to n.",
    correctCode: `function sumToN(n) { return (n * (n + 1)) / 2; }`
  },
  {
    type: "code",
    question: "Create a function to convert Celsius to Fahrenheit.",
    correctCode: `function celsiusToF(c) { return (c * 9/5) + 32; }`
  },
  {
    type: "code",
    question: "Write a function that capitalizes the first letter of a string.",
    correctCode: `function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }`
  },
  {
    type: "code",
    question: "Create a function that checks if an object is empty.",
    correctCode: `function isEmpty(obj) { return Object.keys(obj).length === 0; }`
  },
  {
    type: "code",
    question: "Write a function that finds the second largest number in an array.",
    correctCode: `function secondLargest(arr) { const sorted = [...new Set(arr)].sort((a,b) => b - a); return sorted[1]; }`
  }
];

function Advancedjs() {
  const [theme, setTheme] = useState("dark-mode");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [code, setCode] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  
  const totalQuestions = JSQuestions.length;
  const currentQuestion = JSQuestions[currentQuestionIndex];

  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(theme);
  }, [theme]);

 useEffect(() => {
    setSelectedOptions([]);
    setFeedback("");
    setCode(currentQuestion.starterCode || "");

    const progress = Math.floor(((currentQuestionIndex + 1) / totalQuestions) * 100);
    localStorage.setItem("course_advancedjs_progress", progress);
  }, [currentQuestionIndex, totalQuestions, currentQuestion.starterCode]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  const handleCheckboxChange = (index) => {
    setSelectedOptions(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const validateCheckboxAnswer = () => {
    const correct = currentQuestion.correct;
    const isCorrect =
      correct.length === selectedOptions.length &&
      correct.every(val => selectedOptions.includes(val));
    setFeedback(isCorrect ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const validateCodeAnswer = () => {
    const user = code.trim().replace(/\s+/g, "");
    const expected = currentQuestion.correctCode?.trim().replace(/\s+/g, "") || "";
    setFeedback(user === expected ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const handleRun = () => {
    const html = `
      <html>
        <body>
          <script>
            try {
              ${code}
            } catch (e) {
              document.body.innerHTML = '<pre style="color:red;">' + e + '</pre>';
            }
          </script>
        </body>
      </html>`;
    setPreviewContent(html);
  };

const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed course
      localStorage.setItem("course_advancedjs_completed", "true");
      localStorage.setItem("course_advancedjs_progress", "100");

      alert("🎉 Congratulations! You completed the JavaScript course!");

      window.location.href = "/complete";
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
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
            <div className="question-text">{currentQuestion.question}</div>
             <div
              style={{ margin: "10px 0", color: "green", fontWeight: "bold" }}
            >
              Progress:{" "}
              {Math.floor(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
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
                  extensions={[javascript()]}
                  onChange={(value) => setCode(value)}
                />
                <button onClick={handleRun}>Run Code</button>
                <button onClick={validateCodeAnswer}>Submit Code</button>
                <iframe
                  title="JS Preview"
                  id="previewFrame"
                  style={{ width: "100%", height: "100px", marginTop: "10px", border: "1px solid #ccc" }}
                  srcDoc={previewContent}
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Advancedjs;