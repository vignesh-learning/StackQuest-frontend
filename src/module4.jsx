import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./graphQL.css";


// ---------------- Theory Topics ----------------
const graphqlTopics = [
  {
    title: "Apollo Client Setup",
    content: `👉 Apollo Client is the most popular library to connect a frontend with GraphQL.

🔹 Installation:
npm install @apollo/client graphql

🔹 Example Setup:

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <MyComponent />
    </ApolloProvider>
  );
}

📌 ApolloProvider makes the client accessible to the whole React app.`,
  },
  {
    title: "useQuery Hook",
    content: `👉 The \`useQuery\` hook is used for fetching data in frontend apps.

🔹 Example:

import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql\`
  query {
    users {
      id
      name
    }
  }
\`;

function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

📌 Data is fetched automatically and re-rendered when available.`,
  },
  {
    title: "useMutation Hook",
    content: `👉 The \`useMutation\` hook allows frontend to send data (insert, update, delete).

🔹 Example:

import { useMutation, gql } from "@apollo/client";

const ADD_USER = gql\`
  mutation($id: ID!, $name: String!) {
    addUser(id: $id, name: $name) {
      id
      name
    }
  }
\`;

function AddUser() {
  const [addUser] = useMutation(ADD_USER);

  return (
    <button
      onClick={() => addUser({ variables: { id: "2", name: "Vignesh" } })}
    >
      Add User
    </button>
  );
}

📌 Triggers the mutation when the button is clicked.`,
  },
  {
    title: "useSubscription Hook",
    content: `👉 Subscriptions in the frontend allow **real-time updates** from the server.

🔹 Example:

import { useSubscription, gql } from "@apollo/client";

const NEW_MESSAGE = gql\`
  subscription {
    newMessage {
      id
      content
    }
  }
\`;

function Chat() {
  const { data, loading } = useSubscription(NEW_MESSAGE);

  if (loading) return <p>Waiting for messages...</p>;

  return <p>New Message: {data.newMessage.content}</p>;
}

📌 Useful for chat apps, notifications, live dashboards.`,
  },
  {
    title: "Apollo Cache",
    content: `👉 Apollo automatically caches query results for efficiency.

📌 Benefits:
- Avoids refetching the same query
- Instant UI updates after mutation
- Can be configured using InMemoryCache

🔹 Example: Refetch query after mutation

const [addUser] = useMutation(ADD_USER, {
  refetchQueries: [{ query: GET_USERS }],
});`,
  },
  {
    title: "Error Handling",
    content: `👉 GraphQL errors can be handled using the \`error\` object from hooks.

🔹 Example:

if (error) return <p>Error: {error.message}</p>;

📌 Apollo also supports global error handling with ApolloLink.`,
  },
  {
    title: "Pagination in Apollo",
    content: `👉 Large lists can be fetched using pagination.

🔹 Example with \`fetchMore\`:

const { data, fetchMore } = useQuery(GET_POSTS, {
  variables: { offset: 0, limit: 5 },
});

<button
  onClick={() => fetchMore({
    variables: { offset: data.posts.length }
  })}
>
  Load More
</button>

📌 Efficient for lists like blogs, products, feeds.`,
  },
  {
    title: "Optimistic UI",
    content: `👉 Apollo supports **optimistic UI** to update the frontend instantly before server confirms.

🔹 Example:

const [addTodo] = useMutation(ADD_TODO);

addTodo({
  variables: { text: "Learn GraphQL" },
  optimisticResponse: {
    addTodo: {
      id: -1,
      text: "Learn GraphQL",
      completed: false,
      __typename: "Todo"
    }
  }
});

📌 User sees instant update without waiting for server.`,
  },
];
// ---------------- Practice Questions ----------------
const graphqlQuestions = [
  {
    type: "checkbox",
    question: "Which hooks are provided by Apollo Client for frontend GraphQL integration?",
    options: [
      { text: "useQuery", correct: true },
      { text: "useMutation", correct: true },
      { text: "useSubscription", correct: true },
      { text: "useReducer", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query to fetch `id` and `email` from `users` using Apollo useQuery.",
    expectedAnswer: `const GET_USERS = gql\`
  query {
    users {
      id
      email
    }
  }
\`;`,
    starterCode: `const GET_USERS = gql\`
  query {
    users {
      // write fields here
    }
  }
\`;`,
  },
  {
    type: "checkbox",
    question: "Which of the following are benefits of Apollo Client cache?",
    options: [
      { text: "Reduces network calls", correct: true },
      { text: "Stores query results", correct: true },
      { text: "Provides instant UI updates", correct: true },
      { text: "Acts as a database", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL mutation to add a `book` with `id` and `title` using Apollo useMutation.",
    expectedAnswer: `const ADD_BOOK = gql\`
  mutation($id: ID!, $title: String!) {
    addBook(id: $id, title: $title) {
      id
      title
    }
  }
\`;`,
    starterCode: `const ADD_BOOK = gql\`
  mutation($id: ID!, $title: String!) {
    addBook(id: $id, title: $title) {
      // return fields here
    }
  }
\`;`,
  },
  {
    type: "checkbox",
    question: "Which of the following are true about Subscriptions in frontend GraphQL?",
    options: [
      { text: "They enable real-time updates.", correct: true },
      { text: "They replace queries.", correct: false },
      { text: "They can be used for notifications and chat.", correct: true },
      { text: "They only work in backend.", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL subscription to get live updates for `newPost` with `id` and `title`.",
    expectedAnswer: `const NEW_POST = gql\`
  subscription {
    newPost {
      id
      title
    }
  }
\`;`,
    starterCode: `const NEW_POST = gql\`
  subscription {
    newPost {
      // write fields here
    }
  }
\`;`,
  },
  {
    type: "checkbox",
    question: "Which techniques are supported by Apollo Client for data fetching?",
    options: [
      { text: "Polling", correct: true },
      { text: "fetchMore (pagination)", correct: true },
      { text: "Optimistic UI", correct: true },
      { text: "SQL Joins", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write Apollo useQuery with pagination (fetch first 5 posts).",
    expectedAnswer: `const { data, fetchMore } = useQuery(GET_POSTS, {
  variables: { offset: 0, limit: 5 },
});`,
    starterCode: `const { data, fetchMore } = useQuery(GET_POSTS, {
  variables: { offset: 0, limit:  // fill here
  },
});`,
  },
  {
    type: "checkbox",
    question: "Which of the following are true about Optimistic UI in Apollo?",
    options: [
      { text: "Shows data instantly before server confirms.", correct: true },
      { text: "Always waits for server response.", correct: false },
      { text: "Improves user experience.", correct: true },
      { text: "Not supported in Apollo.", correct: false },
    ],
  },
];

// ---------------- React Component ----------------
function Module4() {
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
    localStorage.setItem("course_module4_progress", progress);
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
      localStorage.setItem("course_module4_completed", "true");
      localStorage.setItem("course_module4_progress", "100");

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

export default Module4;
