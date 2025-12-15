import React, { useState, useEffect } from "react";
import "./intermediate.css";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";



const JSQuestions = [
     {
    type: "checkbox",
    question: "Which of the following are valid JavaScript data types?",
    options: ["String", "Number", "Boolean", "Character"],
    correct: [0, 1, 2],
    code: `let str = "Hello"; let num = 42; let isTrue = true;`
  },
  {
    type: "checkbox",
    question: "Which of the following are used to declare variables in JavaScript?",
    options: ["var", "let", "const", "define"],
    correct: [0, 1, 2],
    code: `var a = 1; let b = 2; const c = 3;`
  },
  {
    type: "checkbox",
    question: "Which of these are comparison operators in JavaScript?",
    options: ["==", "===", "=>", "!="],
    correct: [0, 1, 3],
    code: `5 == "5"; 5 === "5"; 5 != 6;`
  },
  {
    type: "checkbox",
    question: "Which of these are JavaScript loop types?",
    options: ["for", "loop", "while", "do...while"],
    correct: [0, 2, 3],
    code: `for (let i = 0; i < 3; i++) { console.log(i); }`
  },
  {
    type: "checkbox",
    question: "Which of the following are string methods?",
    options: ["toUpperCase", "split", "length", "push"],
    correct: [0, 1, 2],
    code: `"hello".toUpperCase(); "hello world".split(" "); "abc".length;`
  },
  {
    type: "checkbox",
    question: "Which of these are valid JavaScript function declarations?",
    options: ["function test() {}", "let test = function() {}", "let test = () => {}", "def test()"],
    correct: [0, 1, 2],
    code: `function greet() { return "Hi"; }`
  },
  {
    type: "checkbox",
    question: "Which values are considered falsy in JavaScript?",
    options: ["0", "''", "null", "'false'"],
    correct: [0, 1, 2],
    code: `if (!0) console.log("Falsy!");`
  },
  {
    type: "checkbox",
    question: "Which array methods exist in JavaScript?",
    options: ["map", "filter", "reduce", "collect"],
    correct: [0, 1, 2],
    code: `[1, 2, 3].map(x => x * 2);`
  },
  {
    type: "checkbox",
    question: "Which of the following are valid conditional statements?",
    options: ["if", "else", "when", "switch"],
    correct: [0, 1, 3],
    code: `if (true) { console.log("Yes"); } else { console.log("No"); }`
  },
  {
    type: "checkbox",
    question: "Which are valid ways to write comments in JavaScript?",
    options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
    correct: [0, 1],
    code: `// single line \n /* multi-line */`
  },
  {
    type: "checkbox",
    question: "Which of the following can be used to convert to a number?",
    options: ["Number()", "parseInt()", "parseFloat()", "toNumber()"],
    correct: [0, 1, 2],
    code: `Number("123"); parseInt("10"); parseFloat("3.14");`
  },
  {
    type: "checkbox",
    question: "Which of these are object property access methods?",
    options: ["dot notation", "bracket notation", "parentheses", "arrow"],
    correct: [0, 1],
    code: `let obj = { name: "John" }; console.log(obj.name); console.log(obj["name"]);`
  },
  {
    type: "checkbox",
    question: "Which of these are JavaScript primitive types?",
    options: ["string", "number", "object", "boolean"],
    correct: [0, 1, 3],
    code: `typeof "hello"; typeof 5; typeof true;`
  },
  {
    type: "checkbox",
    question: "Which events are used in DOM interaction?",
    options: ["click", "mouseover", "load", "enter"],
    correct: [0, 1, 2],
    code: `element.addEventListener("click", () => {});`
  },
  {
    type: "checkbox",
    question: "Which keywords are used to handle exceptions?",
    options: ["try", "catch", "throw", "final"],
    correct: [0, 1, 2],
    code: `try { throw new Error("Oops"); } catch (e) { console.log(e); }`
  },
  {
    type: "code",
    question: "Declare a variable called 'name' and assign your name to John it.",
    correctCode: `let name = "John";`
  },
  {
    type: "code",
    question: "Create a function called greet that returns 'Hello World'.",
    correctCode: `function greet() { return "Hello World"; }`
  },
  {
    type: "code",
    question: "Write a function that adds two numbers: 5 and 10.",
    correctCode: `function add() { return 5 + 10; }`
  }, {
    type: "code",
    question: "Create an array of numbers from 1 to 5.",
    correctCode: `let numbers = [1, 2, 3, 4, 5];`
  },
  {
    type: "code",
    question: "Write an if statement that checks if a number is greater than 10.",
    correctCode: `if (number > 10) { console.log("Greater"); }`
  },
  {
    type: "code",
    question: "Create an object with properties name:'Alice' and age:25.",
    correctCode: `let person = { name: "Alice", age: 25 };`
  },
  {
    type: "code",
    question: "Use a for loop to print numbers from 1 to 3.",
    correctCode: `for (let i = 1; i <= 3; i++) { console.log(i); }`
  },
  {
    type: "code",
    question: "Write a while loop that runs while x is less than 5.",
    correctCode: `while (x < 5) { x++; }`
  },
  {
    type: "code",
    question: "Create a function that multiplies two numbers and returns the result.",
    correctCode: `function multiply(a, b) { return a * b; }`
  },
  {
    type: "code",
    question: "Declare a constant named PI with value 3.14.",
    correctCode: `const PI = 3.14;`
  },
  {
    type: "code",
    question: "Use template literals to print 'Hello, John!'.",
    correctCode: `let name = "John"; console.log(\`Hello, \${name}!\`);`
  },
  {
    type: "code",
    question: "Create a function that returns the length of a string.",
    correctCode: `function getLength(str) { return str.length; }`
  },
  {
    type: "code",
    question: "Convert the string '123' into a number.",
    correctCode: `let num = Number("123");`
  },
  {
    type: "code",
    question: "Write a function to check if a number is even.",
    correctCode: `function isEven(n) { return n % 2 === 0; }`
  },
  {
    type: "code",
    question: "Write a function that returns the square of a number.",
    correctCode: `function square(n) { return n * n; }`
  },
  {
    type: "code",
    question: "Add an element 'dog' to the animals array.",
    correctCode: `animals.push("dog");`
  },
  {
    type: "code",
    question: "Remove the last element from the numbers array.",
    correctCode: `numbers.pop();`
  },
  {
    type: "code",
    question: "Use Math.random() to generate a random number.",
    correctCode: `let randomNum = Math.random();`
  },
  {
    type: "code",
    question: "Round the number 4.7 down to the nearest integer.",
    correctCode: `Math.floor(4.7);`
  },
  {
    type: "code",
    question: "Use a ternary operator to assign 'adult' or 'minor' based on age.",
    correctCode: `let status = age >= 18 ? "adult" : "minor";`
  },
  {
    type: "code",
    question: "Convert the number 100 to a string.",
    correctCode: `let str = String(100);`
  },
  {
    type: "code",
    question: "Check if an array includes the number 3.",
    correctCode: `arr.includes(3);`
  },
  {
    type: "code",
    question: "Create a Date object representing the current date.",
    correctCode: `let today = new Date();`
  },
  {
    type: "code",
    question: "Create a function that returns the first character of a string.",
    correctCode: `function firstChar(str) { return str[0]; }`
  },
  {
    type: "code",
    question: "Check if the variable x is undefined.",
    correctCode: `if (typeof x === "undefined") { }`
  },
  {
    type: "code",
    question: "Use setTimeout to log 'Done' after 1 second.",
    correctCode: `setTimeout(() => { console.log("Done"); }, 1000);`
  },
  {
    type: "code",
    question: "Create a function that returns the max of two numbers.",
    correctCode: `function max(a, b) { return a > b ? a : b; }`
  },
  {
    type: "code",
    question: "Write code to convert 'true' string into boolean true.",
    correctCode: `let val = "true" === "true";`
  },
  {
    type: "code",
    question: "Use array.map() to double each number in [1,2,3].",
    correctCode: `[1, 2, 3].map(n => n * 2);`
  },
  {
    type: "code",
    question: "Write a switch statement for value 2 with cases 1, 2, and default.",
    correctCode: `switch (2) { case 1: break; case 2: break; default: break; }`
  }
];


function Js() {
  const [theme, setTheme] = useState("dark-mode");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [code, setCode] = useState("");
  const [previewContent, setPreviewContent] = useState("");

  const totalQuestions = JSQuestions.length;
  const currentQuestion = JSQuestions[currentQuestionIndex];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  // Apply theme
  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(theme);
  }, [theme]);

  // Reset states on question change + update progress
  useEffect(() => {
    setSelectedOptions([]);
    setFeedback("");
    setCode(currentQuestion.starterCode || "");

    const progress = Math.floor(((currentQuestionIndex + 1) / totalQuestions) * 100);
    localStorage.setItem("course_js_progress", progress);
  }, [currentQuestionIndex, totalQuestions, currentQuestion.starterCode]);

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
              document.body.innerHTML =
                '<pre style="color:red;">' + e + '</pre>';
            }
          </script>
        </body>
      </html>
    `;
    setPreviewContent(html);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      localStorage.setItem("course_js_completed", "true");
      localStorage.setItem("course_js_progress", "100");

      alert("🎉 Congratulations! You completed the JavaScript course!");

      window.location.href = "/complete";
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
            <i
              className={`fa-solid ${
                theme === "dark-mode" ? "fa-sun" : "fa-moon"
              }`}
            ></i>
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
                <div className="option-instruction">
                  Pick the correct options:
                </div>

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
                  style={{
                    width: "100%",
                    height: "100px",
                    marginTop: "10px",
                    border: "1px solid #ccc",
                  }}
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

export default Js;

