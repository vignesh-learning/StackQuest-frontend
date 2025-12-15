import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./graphQL.css";

// ---------------- Theory Topics ----------------
const graphqlTopics = [
  {
    title: "Backend with GraphQL",
    content: `👉 GraphQL can be used on the backend to define how clients access and modify data.

🔹 Key Parts:
1. **Schema** – defines types, queries, mutations, subscriptions.
2. **Resolvers** – functions that tell GraphQL how to fetch/modify data.
3. **Server** – runs with libraries like Apollo Server or GraphQL Yoga.

📌 Unlike REST, GraphQL uses a single endpoint (e.g., /graphql) and lets clients ask for exactly what they need.`,
  },
  {
    title: "Schema & Types",
    content: `👉 The schema defines the shape of your data.

🔹 Example:
type User {
  id: ID!
  name: String!
  age: Int
}

type Query {
  users: [User!]!
  user(id: ID!): User
}`,
  },
  {
    title: "Resolvers",
    content: `👉 Resolvers connect schema fields to backend logic (like DB calls).

🔹 Example:
Query: {
  users: () => users,   // returns all users
  user: (_, { id }) => users.find(u => u.id === id),
}`,
  },
  {
    title: "Mutations",
    content: `👉 Used for creating, updating, or deleting data.

🔹 Example:
mutation {
  addUser(id: "1", name: "Arun", age: 25) {
    id
    name
  }
}`,
  },
  {
    title: "Subscriptions",
    content: `👉 Used for real-time updates (e.g., chat, notifications).

🔹 Example:
subscription {
  newUser {
    id
    name
  }
}`,
  },
];
// ---------------- Practice Questions ----------------
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
    question: "Write a GraphQL schema type for a 'User' with fields id, name, and age.",
    expectedAnswer: `type User {
  id: ID!
  name: String!
  age: Int
}`,
    starterCode: `type User {
  // fields here
}`,
  },
  {
    type: "checkbox",
    question: "Which are advantages of GraphQL over REST?",
    options: [
      { text: "Single endpoint", correct: true },
      { text: "Over-fetching prevention", correct: true },
      { text: "No schema required", correct: false },
      { text: "Strong typing", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query to fetch id and name of all users.",
    expectedAnswer: `query {
  users {
    id
    name
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
    question: "Which statements are true about GraphQL?",
    options: [
      { text: "GraphQL always uses a single endpoint.", correct: true },
      { text: "GraphQL replaces databases.", correct: false },
      { text: "GraphQL supports strongly typed schema.", correct: true },
      { text: "GraphQL prevents over-fetching.", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query to fetch a single user by id with name and email.",
    expectedAnswer: `query {
  user(id: "1") {
    name
    email
  }
}`,
    starterCode: `query {
  user(id: "") {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Resolvers in GraphQL are used to…",
    options: [
      { text: "Connect schema fields to backend logic", correct: true },
      { text: "Store subscription data", correct: false },
      { text: "Process query/mutation logic", correct: true },
      { text: "Define the database schema", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL mutation to add a 'Post' with id and title.",
    expectedAnswer: `mutation {
  addPost(id: "101", title: "My First Post") {
    id
    title
  }
}`,
    starterCode: `mutation {
  addPost(id: "", title: "") {
    // return fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of these are true about GraphQL Mutations?",
    options: [
      { text: "They can create, update, or delete data.", correct: true },
      { text: "They always return the updated object.", correct: true },
      { text: "They are used for data retrieval only.", correct: false },
      { text: "They cannot accept arguments.", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL mutation to update a user’s age.",
    expectedAnswer: `mutation {
  updateUser(id: "1", age: 30) {
    id
    name
    age
  }
}`,
    starterCode: `mutation {
  updateUser(id: "", age: ) {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of the following is true about Subscriptions in GraphQL?",
    options: [
      { text: "They enable real-time data updates.", correct: true },
      { text: "They use WebSockets.", correct: true },
      { text: "They are the same as queries.", correct: false },
      { text: "They cannot return fields.", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a subscription to listen for new posts with id and title.",
    expectedAnswer: `subscription {
  newPost {
    id
    title
  }
}`,
    starterCode: `subscription {
  newPost {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which features are supported by GraphQL schema?",
    options: [
      { text: "Scalars", correct: true },
      { text: "Custom types", correct: true },
      { text: "Relationships", correct: true },
      { text: "SQL Queries", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query to fetch all books with title and author.",
    expectedAnswer: `query {
  books {
    title
    author
  }
}`,
    starterCode: `query {
  books {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of these are limitations of GraphQL?",
    options: [
      { text: "Complex queries may affect performance", correct: true },
      { text: "No built-in caching", correct: true },
      { text: "Over-fetching", correct: false },
      { text: "Requires strict typing", correct: true },
    ],
  }
];


// ---------------- React Component ----------------
function Module3() {
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
    localStorage.setItem("course_module3_progress", progress);
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
      localStorage.setItem("course_module3_completed", "true");
      localStorage.setItem("course_module3_progress", "100");

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

export default Module3;
