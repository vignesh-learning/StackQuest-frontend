import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./graphQL.css";

// ---------------- Advanced GraphQL Theory ----------------
const graphqlTopics = [
  {
    title: "Fragments",
    content: `👉 Fragments allow you to reuse GraphQL query parts across multiple queries.

🔹 Example:

fragment UserFields on User {
  id
  name
  email
}

query {
  users {
    ...UserFields
  }
}

📌 Avoids duplication of fields across queries.`,
  },
  {
    title: "Directives (@include & @skip)",
    content: `👉 Directives modify query behavior at runtime.

🔹 Example:

query getUser($withEmail: Boolean!) {
  user(id: "1") {
    name
    email @include(if: $withEmail)
  }
}

📌 @include and @skip let you conditionally fetch fields.`,
  },
  {
    title: "Aliases",
    content: `👉 Aliases let you rename fields to avoid conflicts.

🔹 Example:

query {
  user1: user(id: "1") { name }
  user2: user(id: "2") { name }
}

📌 Both results come in a single query with different keys.`,
  },
  {
    title: "Variables in Queries",
    content: `👉 Queries can accept variables, making them reusable.

🔹 Example:

query getUser($id: ID!) {
  user(id: $id) {
    name
    age
  }
}

📌 Useful for dynamic frontend queries.`,
  },
  {
    title: "Input Types",
    content: `👉 GraphQL allows input types for complex arguments.

🔹 Example:

input UserInput {
  id: ID!
  name: String!
  age: Int
}

mutation {
  addUser(input: { id: "1", name: "Arun", age: 25 }) {
    id
    name
  }
}`,
  },
  {
    title: "Interfaces",
    content: `👉 Interfaces define common fields across multiple types.

🔹 Example:

interface Character {
  id: ID!
  name: String!
}

type Hero implements Character {
  id: ID!
  name: String!
  power: String!
}

📌 Helps with polymorphism in GraphQL.`,
  },
  {
    title: "Unions",
    content: `👉 Unions allow a field to return different object types.

🔹 Example:

union SearchResult = User | Post

query {
  search(text: "GraphQL") {
    ... on User {
      id
      name
    }
    ... on Post {
      id
      title
    }
  }
}`,
  },
  {
    title: "Schema Stitching / Federation",
    content: `👉 Used to combine multiple GraphQL services into one.

📌 Apollo Federation allows microservices to expose separate GraphQL APIs and combine them into a single graph.`,
  },
  {
    title: "Batching & Caching (DataLoader)",
    content: `👉 DataLoader batches and caches requests to avoid N+1 query problem.

📌 Instead of making multiple DB calls, DataLoader groups them into one.`,
  },
  {
    title: "Security in GraphQL",
    content: `👉 Advanced security involves:
- Query depth limiting (prevent nested infinite queries)
- Query complexity analysis
- Authentication & Authorization with context`,
  },
  {
    title: "Subscriptions at Scale",
    content: `👉 Subscriptions can be scaled with:
- WebSockets (Apollo, GraphQL Yoga)
- Pub/Sub systems (Redis, Kafka, RabbitMQ)`,
  },
  {
    title: "File Uploads",
    content: `👉 GraphQL supports file uploads using scalar Upload (Apollo).

mutation($file: Upload!) {
  uploadFile(file: $file) {
    url
  }
}`,
  },
  {
    title: "Custom Scalars",
    content: `👉 You can define custom scalars like Date, JSON.

scalar Date
scalar JSON

📌 Useful for handling complex data types.`,
  },
];
// ---------------- Advanced GraphQL Practice ----------------
const graphqlQuestions = [
  {
    type: "checkbox",
    question: "Which of the following are advanced GraphQL features?",
    options: [
      { text: "Fragments", correct: true },
      { text: "Aliases", correct: true },
      { text: "Unions", correct: true },
      { text: "Cookies", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL fragment for `id` and `name` of a `User`.",
    expectedAnswer: `fragment UserFields on User {
  id
  name
}`,
    starterCode: `fragment UserFields on User {
  // fields here
}`,
  },
  {
    type: "checkbox",
    question: "Which directives are available in GraphQL?",
    options: [
      { text: "@include", correct: true },
      { text: "@skip", correct: true },
      { text: "@deprecated", correct: true },
      { text: "@readonly", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query using @include to fetch email only if a variable is true.",
    expectedAnswer: `query getUser($withEmail: Boolean!) {
  user(id: "1") {
    name
    email @include(if: $withEmail)
  }
}`,
    starterCode: `query getUser($withEmail: Boolean!) {
  user(id: "1") {
    name
    // email with directive
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of the following are true about Aliases in GraphQL?",
    options: [
      { text: "They allow renaming fields.", correct: true },
      { text: "They can fetch the same field with different arguments.", correct: true },
      { text: "They replace schema definitions.", correct: false },
      { text: "They are useful in avoiding field conflicts.", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a query to fetch two users (id:1 and id:2) with aliases user1 and user2.",
    expectedAnswer: `query {
  user1: user(id: "1") { name }
  user2: user(id: "2") { name }
}`,
    starterCode: `query {
  // alias here
}`,
  },
  {
    type: "checkbox",
    question: "Which are true about Input Types in GraphQL?",
    options: [
      { text: "They allow grouping arguments into objects.", correct: true },
      { text: "They can be reused in multiple mutations.", correct: true },
      { text: "They replace output types.", correct: false },
      { text: "They improve schema readability.", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write an input type UserInput with fields id, name, and age.",
    expectedAnswer: `input UserInput {
  id: ID!
  name: String!
  age: Int
}`,
    starterCode: `input UserInput {
  // fields here
}`,
  },
  {
    type: "checkbox",
    question: "Which are valid GraphQL polymorphic types?",
    options: [
      { text: "Interfaces", correct: true },
      { text: "Unions", correct: true },
      { text: "Enums", correct: false },
      { text: "Scalars", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL union SearchResult = User | Post.",
    expectedAnswer: `union SearchResult = User | Post`,
    starterCode: `union SearchResult = // fill here`,
  },
  {
    type: "checkbox",
    question: "Which are benefits of using Fragments?",
    options: [
      { text: "Avoid duplication", correct: true },
      { text: "Easier query maintenance", correct: true },
      { text: "Automatic pagination", correct: false },
      { text: "Shared fields across queries", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL interface Character with id and name.",
    expectedAnswer: `interface Character {
  id: ID!
  name: String!
}`,
    starterCode: `interface Character {
  // fields here
}`,
  },
  {
    type: "checkbox",
    question: "Which are security practices in GraphQL?",
    options: [
      { text: "Query depth limiting", correct: true },
      { text: "Authentication & Authorization", correct: true },
      { text: "SQL Joins", correct: false },
      { text: "Query complexity analysis", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL custom scalar for Date.",
    expectedAnswer: `scalar Date`,
    starterCode: `scalar // name here`,
  },
  {
    type: "checkbox",
    question: "Which are true about Apollo Federation?",
    options: [
      { text: "It allows combining multiple GraphQL services.", correct: true },
      { text: "It is used for schema stitching.", correct: true },
      { text: "It only works for REST APIs.", correct: false },
      { text: "It supports microservices architecture.", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL mutation to upload a file with scalar Upload.",
    expectedAnswer: `mutation($file: Upload!) {
  uploadFile(file: $file) {
    url
  }
}`,
    starterCode: `mutation($file: Upload!) {
  uploadFile(file: $file) {
    // return url
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which are scaling strategies for Subscriptions?",
    options: [
      { text: "WebSockets", correct: true },
      { text: "Polling", correct: false },
      { text: "Redis Pub/Sub", correct: true },
      { text: "Kafka", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a subscription to listen for new comments (id, text).",
    expectedAnswer: `subscription {
  newComment {
    id
    text
  }
}`,
    starterCode: `subscription {
  newComment {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which problems does DataLoader solve?",
    options: [
      { text: "Batching requests", correct: true },
      { text: "Caching results", correct: true },
      { text: "Over-fetching", correct: false },
      { text: "N+1 query problem", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query with variables ($id: ID!) to fetch a user’s name.",
    expectedAnswer: `query getUser($id: ID!) {
  user(id: $id) {
    name
  }
}`,
    starterCode: `query getUser($id: ID!) {
  user(id: $id) {
    // field here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of the following are valid GraphQL custom scalars?",
    options: [
      { text: "Date", correct: true },
      { text: "JSON", correct: true },
      { text: "Boolean", correct: false },
      { text: "Email", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query using a fragment for Book fields (title, author).",
    expectedAnswer: `fragment BookFields on Book {
  title
  author
}

query {
  books {
    ...BookFields
  }
}`,
    starterCode: `fragment BookFields on Book {
  // fields here
}

query {
  books {
    // spread fragment here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which are common performance issues in GraphQL?",
    options: [
      { text: "Deeply nested queries", correct: true },
      { text: "Excessive fragments", correct: false },
      { text: "Large response sizes", correct: true },
      { text: "N+1 problem", correct: true },
    ],
  },
];

// ---------------- React Component ----------------
function Module5() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showPractice, setShowPractice] = useState(false);

  // Quiz state
  const [theme, setTheme] = useState("dark-mode");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [code, setCode] = useState("");

  const totalQuestions = graphqlQuestions.length;
  const currentQuestion = graphqlQuestions[currentIndex];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  useEffect(() => {
    if (showPractice) {
      setFeedback("");
      setSelectedOptions([]);
      setCode(currentQuestion.starterCode || "");

    const progress = Math.floor(((currentIndex + 1) / totalQuestions) * 100);
    localStorage.setItem("course_module5_progress", progress);
    }
  }, [currentIndex, showPractice, totalQuestions, currentQuestion.starterCode]);

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
    const expected = currentQuestion.expectedAnswer.trim().replace(/\s+/g, "");
    setFeedback(user === expected ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      localStorage.setItem("course_module5_completed", "true");
      localStorage.setItem("course_module5_progress", "100");

      alert("🎉 Congratulations! You completed the HTML course!");

      window.location.href = "/graphql";
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className={showPractice ? theme : "graphql-theory-container"}
      style={{ padding: "20px", fontFamily: "Arial" }}
    >
      <header className="main-header" style={{ marginBottom: "20px" }}>
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
          {showPractice && (
            <button className="theme-toggle" onClick={toggleTheme}>
              <i className={`fa-solid ${theme === "dark-mode" ? "fa-sun" : "fa-moon"}`}></i>
            </button>
          )}
        </div>
      </header>

      {!showPractice ? (
        <div
          className="theory-section"
          style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}
        >
          <div style={{ flex: 1 }}>
            <h2>{graphqlTopics[currentTopic].title}</h2>
            <pre
              className="theory-text"
              style={{
                whiteSpace: "pre-wrap",
                backgroundColor: "#f0f0f0",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              {graphqlTopics[currentTopic].content}
            </pre>

            <div className="topic-navigation" style={{ marginTop: "1rem" }}>
              <button
                onClick={() => setCurrentTopic((prev) => Math.max(prev - 1, 0))}
                disabled={currentTopic === 0}
                style={{ marginRight: "10px" }}
              >
                Previous Topic
              </button>

              {currentTopic < graphqlTopics.length - 1 ? (
                <button onClick={() => setCurrentTopic((prev) => prev + 1)}>
                  Next Topic
                </button>
              ) : (
                <button onClick={() => setShowPractice(true)}>Start Practice</button>
              )}
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Module5;
