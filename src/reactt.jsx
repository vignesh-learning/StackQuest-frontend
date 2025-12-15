import React, { useState, useEffect } from "react";
import "./intermediate.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const ReactQuestions = [
    {
  type: "checkbox",
  question: "Which hooks are built-in in React?",
  options: ["useState", "useEffect", "useFetch", "useMemo"],
  correct: [0, 1, 3],
  code: `useState(0); useEffect(() => {}, []); useMemo(() => {}, []);`
},
{
  type: "checkbox",
  question: "Which of these are correct ways to create a component in React?",
  options: ["Function component", "Class component", "Object component", "Arrow function component"],
  correct: [0, 1, 3],
  code: `const Hello = () => <h1>Hello</h1>;`
},
{
  type: "checkbox",
  question: "Which of the following are true about JSX?",
  options: ["JSX allows HTML in JS", "JSX requires one parent element", "JSX is optional in React", "JSX is the same as HTML"],
  correct: [0, 1, 2],
  code: `return (<div><p>Hello</p></div>);`
},
{
  type: "checkbox",
  question: "Which of these are valid props usage?",
  options: ["props.name", "this.props.name", "useProps()", "props['name']"],
  correct: [0, 1, 3],
  code: `function Hello(props) { return <p>{props.name}</p>; }`
},
{
  type: "checkbox",
  question: "Which React features manage state?",
  options: ["useState", "useReducer", "useEffect", "useRef"],
  correct: [0, 1],
  code: `const [count, setCount] = useState(0);`
},
{
  type: "checkbox",
  question: "Which of these are lifecycle methods in class components?",
  options: ["componentDidMount", "useEffect", "componentWillUnmount", "render"],
  correct: [0, 2, 3],
  code: `componentDidMount() { console.log("Mounted"); }`
},
{
  type: "checkbox",
  question: "Which are valid ways to pass data to components?",
  options: ["Props", "Context", "Redux store", "useCallback"],
  correct: [0, 1, 2],
  code: `<Child name="John" />`
},
{
  type: "checkbox",
  question: "Which methods are used to optimize performance in React?",
  options: ["useMemo", "useCallback", "React.memo", "forceUpdate"],
  correct: [0, 1, 2],
  code: `const memoizedValue = useMemo(() => compute(), []);`
},
{
  type: "checkbox",
  question: "Which hooks can be used for side effects?",
  options: ["useState", "useEffect", "useRef", "useLayoutEffect"],
  correct: [1, 3],
  code: `useEffect(() => { console.log("Effect"); }, []);`
},
{
  type: "checkbox",
  question: "Which of these libraries are used for routing in React?",
  options: ["React Router", "React Navigation", "Next.js Routing", "Redux Router"],
  correct: [0, 2],
  code: `<Route path="/home" element={<Home />} />`
},
{
  type: "checkbox",
  question: "Which are ways to conditionally render in React?",
  options: ["Ternary operator", "Logical &&", "if/else inside JSX", "Switch statement"],
  correct: [0, 1, 3],
  code: `{isLoggedIn ? <Home /> : <Login />}`
},
{
  type: "checkbox",
  question: "Which of these are valid forms of controlled components?",
  options: ["input with useState", "textarea with useState", "select with useState", "input without value"],
  correct: [0, 1, 2],
  code: `const [value, setValue] = useState("");`
},
{
  type: "checkbox",
  question: "Which are benefits of using React?",
  options: ["Reusable components", "Virtual DOM", "One-way data flow", "Two-way binding"],
  correct: [0, 1, 2],
  code: `ReactDOM.render(<App />, document.getElementById('root'));`
},
{
  type: "checkbox",
  question: "Which are valid ways to handle form submission in React?",
  options: ["onSubmit", "onClick", "event.preventDefault", "form.submit()"],
  correct: [0, 2],
  code: `<form onSubmit={handleSubmit}>`
},
{
  type: "checkbox",
  question: "Which methods are valid to create a ref?",
  options: ["useRef", "createRef", "React.useRef", "useState"],
  correct: [0, 1, 2],
  code: `const ref = React.useRef(null);`
},
{
  type: "code",
  question: "Create a functional component that returns 'Hello React'.",
  correctCode: `function Hello() { return <h1>Hello React</h1>; }`
},
{
  type: "code",
  question: "Write a component that takes a 'name' prop and displays it.",
  correctCode: `function Greet(props) { return <p>Hello, {props.name}</p>; }`
},
{
  type: "code",
  question: "Use useState to create a counter that starts at 0.",
  correctCode: `const [count, setCount] = useState(0);`
},
{
  type: "code",
  question: "Create a button that increments the counter on click.",
  correctCode: `<button onClick={() => setCount(count + 1)}>Add</button>`
},
{
  type: "code",
  question: "Write a useEffect that logs when the component mounts.",
  correctCode: `useEffect(() => { console.log("Mounted"); }, []);`
},
{
  type: "code",
  question: "Create a component that accepts children and renders them.",
  correctCode: `function Wrapper(props) { return <div>{props.children}</div>; }`
},
{
  type: "code",
  question: "Create a component that toggles a boolean using a button.",
  correctCode: `const [show, setShow] = useState(false); <button onClick={() => setShow(!show)}>Toggle</button>`
},
{
  type: "code",
  question: "Create a ref and assign it to an input element.",
  correctCode: `const inputRef = useRef(); <input ref={inputRef} />`
},
{
  type: "code",
  question: "Write a custom hook that tracks window width.",
  correctCode: `function useWindowWidth() { const [width, setWidth] = useState(window.innerWidth); useEffect(() => { const handleResize = () => setWidth(window.innerWidth); window.addEventListener('resize', handleResize); return () => window.removeEventListener('resize', handleResize); }, []); return width; }`
},
{
  type: "code",
  question: "Create a component that displays a list of items from an array.",
  correctCode: `function List({ items }) { return <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>; }`
},
{
  type: "code",
  question: "Write a component that uses useEffect to fetch data from API.",
  correctCode: `useEffect(() => { fetch('/api').then(res => res.json()).then(data => console.log(data)); }, []);`
},
{
  type: "code",
  question: "Create a component with conditional rendering using ternary.",
  correctCode: `function Status({ isOnline }) { return <div>{isOnline ? "Online" : "Offline"}</div>; }`
},
{
  type: "code",
  question: "Create a component that uses useMemo for expensive calculation.",
  correctCode: `const result = useMemo(() => expensiveCalc(num), [num]);`
},
{
  type: "code",
  question: "Write a component that uses useCallback to memoize a function.",
  correctCode: `const handleClick = useCallback(() => console.log('Clicked'), []);`
},
{
  type: "code",
  question: "Create a component using React.forwardRef.",
  correctCode: `const Input = React.forwardRef((props, ref) => <input ref={ref} {...props} />);`
}
];

function Reactt() {
  const [theme, setTheme] = useState("dark-mode");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [code, setCode] = useState("");
  const [previewContent, setPreviewContent] = useState("");

  const currentQuestion = ReactQuestions[currentQuestionIndex];
  const totalQuestions = ReactQuestions.length;

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  useEffect(() => {
    setFeedback("");
    setSelectedOptions([]);
    setCode(currentQuestion.starterCode || "");

    const progress = Math.floor(((currentQuestionIndex + 1) / totalQuestions) * 100);
    localStorage.setItem("course_react_progress", progress);

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
      </html>`;
    setPreviewContent(html);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      localStorage.setItem("course_react_completed", "true");
      localStorage.setItem("course_react_progress", "100");

      alert("🎉 Congratulations! You completed the React course!");

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

export default Reactt;
