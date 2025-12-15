import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./graphQL.css";

const graphqlTopics = [
  {
    title: "Introduction to GraphQL",
    content: `GraphQL is a query language for APIs and a runtime for executing those queries.
It was developed by Facebook in 2012 and released publicly in 2015.

Unlike REST APIs (where you fetch data from different endpoints), GraphQL allows you to:

- Ask for exactly the data you need (no more, no less).
- Fetch related data in a single request instead of multiple round trips.
- Have strongly-typed schemas that define the structure of data.`,
    image: "graphintro.jpeg",
  },
  {
    title: "GraphQL Core Concepts",
    content: `The main concepts of GraphQL include:

1. **Schema** – Defines the structure of available data.
2. **Queries** – For reading/fetching data.
3. **Mutations** – For modifying/writing data.
4. **Subscriptions** – For real-time data via WebSockets.
5. **Resolvers** – Fetch the actual data.
6. **Types, Directives, Fragments, and Introspection** – Provide flexibility and power.`,
    image: "core.jpg",
  },
  {
    title: "GraphQL vs REST",
    content: `GraphQL is often compared to REST APIs:

- REST has multiple endpoints, GraphQL has a single endpoint.
- REST often over-fetches or under-fetches data, GraphQL avoids this.
- REST requires versioning, GraphQL evolves with schema changes.

### REST Example:
Fetch user and posts (requires 2 requests):

\`\`\`http
GET /users/1
GET /users/1/posts
\`\`\`

Response:
\`\`\`json
{
  "id": 1,
  "name": "Arun",
  "email": "arun@example.com"
}

[
  { "id": 101, "title": "GraphQL Basics" },
  { "id": 102, "title": "REST vs GraphQL" }
]
\`\`\`

### GraphQL Example:
Fetch user and posts in a single request:

\`\`\`graphql
query {
  user(id: 1) {
    name
    posts {
      title
    }
  }
}
\`\`\`

Response:
\`\`\`json
{
  "data": {
    "user": {
      "name": "Arun",
      "posts": [
        { "title": "GraphQL Basics" },
        { "title": "REST vs GraphQL" }
      ]
    }
  }
}
\`\`\`
`,
    image: "graphqlvsrest.png",
  },
  {
    title: "Key Features of GraphQL",
    content: `Declarative Data Fetching – Clients specify what data they want and the server responds with only that data.

Single Endpoint – Instead of multiple REST endpoints (/users, /posts, etc.), GraphQL uses one endpoint (e.g., /graphql).

Strongly Typed Schema – Every GraphQL API is backed by a schema that defines types and relationships.

Real-Time with Subscriptions – GraphQL supports real-time updates through subscriptions.

Efficient Data Fetching – No over-fetching (getting too much data) or under-fetching (missing needed fields).`,
    image: "key_features.jpeg",
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
    question: "Write a simple GraphQL query to fetch `name` and `age` from a `user`.",
    expectedAnswer: `query {
  user {
    name
    age
  }
}`,
    starterCode: `query {
  user {
    // write fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which of the following is true about GraphQL?",
    options: [
      { text: "GraphQL always uses a single endpoint.", correct: true },
      { text: "GraphQL supports strongly-typed schema.", correct: true },
      { text: "GraphQL replaces databases.", correct: false },
      { text: "GraphQL prevents over-fetching and under-fetching.", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL mutation to add a `user` with `id` and `name`.",
    expectedAnswer: `mutation {
  addUser(id: "1", name: "Arun") {
    id
    name
  }
}`,
    starterCode: `mutation {
  addUser(id: "", name: "") {
    // return fields here
  }
}`,
  },
];

function Module1() {
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
    localStorage.setItem("course_module1_progress", progress);
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
      localStorage.setItem("course_module1_completed", "true");
      localStorage.setItem("course_module1_progress", "100");

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
      style={{ padding: "20px", fontFamily: "Times new roman" }}
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
        <div className="theory-section" style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
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
                <button onClick={() => setCurrentTopic((prev) => prev + 1)}>Next Topic</button>
              ) : (
                <button onClick={() => setShowPractice(true)}>Start Practice</button>
              )}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <img
              src={graphqlTopics[currentTopic].image}
              alt={graphqlTopics[currentTopic].title}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              }}
            />
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

export default Module1;
