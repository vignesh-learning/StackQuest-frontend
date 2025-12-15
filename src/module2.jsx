import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./graphQL.css";


const graphqlTopics = [
  {
    title: "Queries",
    content: `👉 Queries in GraphQL are like asking for data (similar to SELECT in SQL or GET in REST).
Instead of getting a fixed response, you can ask exactly what you need.

🔹 Example:

query {
  user(id: "1") {
    name
    email
  }
}

✅ Response:

{
  "data": {
    "user": {
      "name": "Arun",
      "email": "arun@example.com"
    }
  }
}

📌 Here we only asked for name and email, so the server gave exactly that (nothing extra).`,
  },
  {
    title: "Mutations",
    content: `👉 Mutations are used to change or modify data (like CREATE, UPDATE, DELETE in databases).

🔹 Example: Add a new user

mutation {
  createUser(name: "Vignesh", email: "vignesh@example.com") {
    id
    name
    email
  }
}

✅ Response:

{
  "data": {
    "createUser": {
      "id": "2",
      "name": "Vignesh",
      "email": "vignesh@example.com"
    }
  }
}

📌 Mutations let you update the backend and immediately return the new/updated data.`,
  },
  {
    title: "Subscriptions",
    content: `👉 Subscriptions are for real-time updates.
If data changes on the server, the client automatically receives updates (like a live chat or stock price feed).

🔹 Example:

subscription {
  newMessage {
    id
    text
    user
  }
}

📌 Whenever a new message is posted, the client instantly gets notified without refreshing.`,
  },
  {
    title: "Schema",
    content: `👉 A schema is like a blueprint for GraphQL.
It defines what queries, mutations, and data types are available.

🔹 Example:

type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  user(id: ID!): User
}

type Mutation {
  createUser(name: String!, email: String!): User
}

📌 Schema clearly tells what you can ask for (queries), what you can change (mutations), and the structure of data (types).`,
  },
  {
    title: "Variables",
    content: `👉 Variables let you make queries dynamic instead of hardcoding values.

🔹 Example:

query getUser($userId: ID!) {
  user(id: $userId) {
    name
    email
  }
}

Variables sent with query:

{
  "userId": "1"
}

📌 This way you can reuse the same query for different inputs.`,
  },
  {
    title: "Fragments",
    content: `👉 Fragments are like reusable pieces of queries.
They help avoid repeating the same fields again and again.

🔹 Example:

fragment userFields on User {
  id
  name
  email
}

query {
  user(id: "1") {
    ...userFields
  }
  anotherUser: user(id: "2") {
    ...userFields
  }
}

📌 Both queries use the same userFields fragment, keeping code clean and reusable.`,
  },
  {
    title: "Benefits of GraphQL",
    content: `✔ Ask only what you need → No over-fetching or under-fetching
✔ Single endpoint → Unlike REST, you don’t need multiple URLs for different resources
✔ Strongly typed → Schema defines data types clearly
✔ Faster development → Frontend and backend teams can work independently
✔ Real-time support → Subscriptions give live updates
✔ Flexible → Works with any database or programming language`,
  },
];


const graphqlQuestions = [
  {
    type: "checkbox",
    question: "Which of the following are valid GraphQL operations?",
    options: [
      { text: "Query", correct: true },
      { text: "Mutation", correct: true },
      { text: "Subscription", correct: true },
      { text: "Procedure", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query to fetch `title` and `author` of a `book`.",
    expectedAnswer: `query {
  book {
    title
    author
  }
}`,
    starterCode: `query {
  book {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of these are advantages of GraphQL?",
    options: [
      { text: "Prevents over-fetching of data", correct: true },
      { text: "Requires multiple endpoints", correct: false },
      { text: "Uses strongly-typed schema", correct: true },
      { text: "Automatically replaces REST APIs", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL mutation to update a user's email by `id`.",
    expectedAnswer: `mutation {
  updateUser(id: "1", email: "test@example.com") {
    id
    email
  }
}`,
    starterCode: `mutation {
  updateUser(id: "", email: "") {
    // return fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of the following are true about GraphQL schemas?",
    options: [
      { text: "Schemas define types and fields.", correct: true },
      { text: "Schemas are optional in GraphQL.", correct: false },
      { text: "Schemas help validate queries.", correct: true },
      { text: "Schemas replace databases.", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL subscription to listen for new `messages` with `id` and `content`.",
    expectedAnswer: `subscription {
  messageAdded {
    id
    content
  }
}`,
    starterCode: `subscription {
  messageAdded {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of these can GraphQL queries include?",
    options: [
      { text: "Fields", correct: true },
      { text: "Fragments", correct: true },
      { text: "Variables", correct: true },
      { text: "SQL Statements", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query with a variable `$id` to fetch a user’s `name` and `age`.",
    expectedAnswer: `query GetUser($id: ID!) {
  user(id: $id) {
    name
    age
  }
}`,
    starterCode: `query GetUser($id: ID!) {
  user(id: $id) {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of the following are valid GraphQL scalar types?",
    options: [
      { text: "String", correct: true },
      { text: "Integer", correct: false },
      { text: "ID", correct: true },
      { text: "Boolean", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL mutation to delete a `post` by `id` and return its `id`.",
    expectedAnswer: `mutation {
  deletePost(id: "101") {
    id
  }
}`,
    starterCode: `mutation {
  deletePost(id: "") {
    // return fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of these statements about GraphQL fragments are true?",
    options: [
      { text: "Fragments allow reusing field selections.", correct: true },
      { text: "Fragments reduce code duplication.", correct: true },
      { text: "Fragments can only be used in mutations.", correct: false },
      { text: "Fragments must specify a type.", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a fragment for `User` type with fields `id` and `name`, and use it in a query.",
    expectedAnswer: `fragment userFields on User {
  id
  name
}

query {
  user(id: "1") {
    ...userFields
  }
}`,
    starterCode: `fragment userFields on User {
  // fields here
}

query {
  user(id: "1") {
    ...userFields
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which are common benefits of GraphQL?",
    options: [
      { text: "Reduces number of API calls", correct: true },
      { text: "Requires schema introspection", correct: false },
      { text: "Flexible data fetching", correct: true },
      { text: "Improves developer productivity", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query to fetch all `posts` with `title` and nested `comments` containing `text`.",
    expectedAnswer: `query {
  posts {
    title
    comments {
      text
    }
  }
}`,
    starterCode: `query {
  posts {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of the following best describe GraphQL variables?",
    options: [
      { text: "Variables make queries reusable.", correct: true },
      { text: "Variables must start with `$`.", correct: true },
      { text: "Variables are hardcoded values.", correct: false },
      { text: "Variables can reduce query duplication.", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL mutation using a variable `$id` to fetch a user with `name` and `email`.",
    expectedAnswer: `query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
  }
}`,
    starterCode: `query GetUser($id: ID!) {
  user(id: $id) {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of the following is true about GraphQL subscriptions?",
    options: [
      { text: "Subscriptions allow real-time updates.", correct: true },
      { text: "Subscriptions are executed over WebSockets.", correct: true },
      { text: "Subscriptions are only for fetching once.", correct: false },
      { text: "Subscriptions can notify multiple clients.", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query to fetch a `product` with `id`, `name`, and nested `price`.",
    expectedAnswer: `query {
  product(id: "200") {
    id
    name
    price
  }
}`,
    starterCode: `query {
  product(id: "") {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of these are valid GraphQL response formats?",
    options: [
      { text: "Always JSON", correct: true },
      { text: "XML", correct: false },
      { text: "Plain text", correct: false },
      { text: "Nested JSON objects", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query to fetch a list of `users` with `id`, `name`, and `posts` (titles only).",
    expectedAnswer: `query {
  users {
    id
    name
    posts {
      title
    }
  }
}`,
    starterCode: `query {
  users {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of these statements about GraphQL resolvers are correct?",
    options: [
      { text: "Resolvers define how fields are fetched.", correct: true },
      { text: "Resolvers can call databases or APIs.", correct: true },
      { text: "Resolvers are written in SQL.", correct: false },
      { text: "Every field can have a resolver.", correct: true },
    ],
  },
];


function Module2() {
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
    localStorage.setItem("course_module2_progress", progress);
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
      localStorage.setItem("course_module2_completed", "true");
      localStorage.setItem("course_module2_progress", "100");

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

          {/* Removed graphqlTopics[currentTopic].image since no images are defined */}
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

export default Module2;
