import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./graphQL.css";

// ---------------- Theory Topics ----------------
const graphqlTopics = [
  {
    title: "Introduction to GraphQL",
    content: `👉 GraphQL is a query language for APIs and runtime to execute those queries.
It lets clients ask exactly what they need.

📌 Example:

query {
  user(id: "1") {
    name
    email
  }
}`,
  },
  {
    title: "Operations in GraphQL",
    content: `👉 GraphQL supports 3 main operations:

1️⃣ Queries → Read data  
2️⃣ Mutations → Write/Update/Delete data  
3️⃣ Subscriptions → Real-time updates via WebSockets`,
  },
  {
    title: "Fragments in GraphQL",
    content: `👉 Fragments let you reuse fields in queries.

📌 Example:

fragment UserFields on User {
  id
  name
}

query {
  users {
    ...UserFields
  }
}`,
  },
];

const graphqlQuestions = [
  // ---------- BASICS ----------
  {
    type: "checkbox",
    question: "Which of the following are GraphQL operations?",
    options: [
      { text: "Query", correct: true },
      { text: "Mutation", correct: true },
      { text: "Subscription", correct: true },
      { text: "Procedure", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL query to fetch `id` and `name` of all users.",
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
      { text: "GraphQL prevents over-fetching.", correct: true },
      { text: "GraphQL replaces databases.", correct: false },
      { text: "GraphQL uses a strongly typed schema.", correct: true },
      { text: "GraphQL supports a single endpoint.", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL mutation to add a `user` with id and name.",
    expectedAnswer: `mutation {
  addUser(id: "1", name: "Arun") {
    id
    name
  }
}`,
    starterCode: `mutation {
  addUser(id: "", name: "") {
    // fields here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which are true about Subscriptions?",
    options: [
      { text: "They enable real-time updates.", correct: true },
      { text: "They use WebSockets.", correct: true },
      { text: "They are identical to queries.", correct: false },
      { text: "They cannot return fields.", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a GraphQL subscription to listen for new messages with `id` and `content`.",
    expectedAnswer: `subscription {
  newMessage {
    id
    content
  }
}`,
    starterCode: `subscription {
  newMessage {
    // fields here
  }
}`,
  },

  // ---------- INTERMEDIATE ----------
  {
    type: "checkbox",
    question: "Which are true about GraphQL fragments?",
    options: [
      { text: "They avoid duplication.", correct: true },
      { text: "They are reusable.", correct: true },
      { text: "They define schema types.", correct: false },
      { text: "They improve query readability.", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a fragment `UserFields` with `id` and `name` for User.",
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
    question: "Which are built-in GraphQL directives?",
    options: [
      { text: "@include", correct: true },
      { text: "@skip", correct: true },
      { text: "@deprecated", correct: true },
      { text: "@readonly", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a query to fetch a user’s name and conditionally fetch email using @include.",
    expectedAnswer: `query getUser($withEmail: Boolean!) {
  user(id: "1") {
    name
    email @include(if: $withEmail)
  }
}`,
    starterCode: `query getUser($withEmail: Boolean!) {
  user(id: "1") {
    name
    // directive here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which are valid GraphQL input types?",
    options: [
      { text: "Objects with fields", correct: true },
      { text: "Scalars", correct: true },
      { text: "Unions", correct: false },
      { text: "Interfaces", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write an input type `UserInput` with fields id, name, and age.",
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
    question: "Which are true about GraphQL variables?",
    options: [
      { text: "They allow dynamic queries.", correct: true },
      { text: "They make queries reusable.", correct: true },
      { text: "They must be declared with $ syntax.", correct: true },
      { text: "They replace resolvers.", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a query with a variable $id: ID! to fetch user’s name.",
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

  // ---------- ADVANCED ----------
  {
    type: "checkbox",
    question: "Which are valid GraphQL polymorphic types?",
    options: [
      { text: "Interfaces", correct: true },
      { text: "Unions", correct: true },
      { text: "Scalars", correct: false },
      { text: "Enums", correct: false },
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
    question: "Which are valid GraphQL custom scalars?",
    options: [
      { text: "Date", correct: true },
      { text: "JSON", correct: true },
      { text: "Boolean", correct: false },
      { text: "Email", correct: true },
    ],
  },
  {
    type: "code",
    question: "Write a custom scalar for Date.",
    expectedAnswer: `scalar Date`,
    starterCode: `scalar // name here`,
  },
  {
    type: "checkbox",
    question: "Which are best practices for GraphQL security?",
    options: [
      { text: "Query depth limiting", correct: true },
      { text: "Authorization", correct: true },
      { text: "Authentication", correct: true },
      { text: "SQL joins", correct: false },
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
    question: "Which are scaling strategies for subscriptions?",
    options: [
      { text: "WebSockets", correct: true },
      { text: "Redis Pub/Sub", correct: true },
      { text: "Kafka", correct: true },
      { text: "Polling", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a subscription for new comments with id and text.",
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
      { text: "N+1 query problem", correct: true },
      { text: "Batching requests", correct: true },
      { text: "Caching results", correct: true },
      { text: "Over-fetching", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a query using a fragment `BookFields` for title and author.",
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
    // use fragment here
  }
}`,
  },
  {
    type: "checkbox",
    question: "Which are common performance issues in GraphQL?",
    options: [
      { text: "Deeply nested queries", correct: true },
      { text: "N+1 problem", correct: true },
      { text: "Large response sizes", correct: true },
      { text: "Over-fetching", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a mutation to upload a file using scalar Upload.",
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
  },{
    type: "checkbox",
    question: "Which are true about GraphQL introspection?",
    options: [
      { text: "It allows clients to query schema details.", correct: true },
      { text: "It is used to generate API documentation.", correct: true },
      { text: "It is always disabled in production by default.", correct: false },
      { text: "It can query field types and arguments.", correct: true },
    ],
  },
  // 2
  {
    type: "code",
    question: "Write an introspection query to list all types in the schema.",
    expectedAnswer: `{
  __schema {
    types {
      name
    }
  }
}`,
    starterCode: `{
  __schema {
    // fields here
  }
}`,
  },
  // 3
  {
    type: "checkbox",
    question: "Which are valid GraphQL collection types?",
    options: [
      { text: "[String]", correct: true },
      { text: "[Int!]", correct: true },
      { text: "[Boolean!]!", correct: true },
      { text: "Array<String>", correct: false },
    ],
  },
  // 4
  {
    type: "code",
    question: "Define a GraphQL enum type `Role` with values ADMIN, USER, and GUEST.",
    expectedAnswer: `enum Role {
  ADMIN
  USER
  GUEST
}`,
    starterCode: `enum Role {
  // values here
}`,
  },
  // 5
  {
    type: "checkbox",
    question: "Which are true about GraphQL unions?",
    options: [
      { text: "They allow a field to return multiple object types.", correct: true },
      { text: "They require implementing interfaces.", correct: false },
      { text: "They are useful for search results with mixed types.", correct: true },
      { text: "They support scalar types directly.", correct: false },
    ],
  },
  // 6
  {
    type: "code",
    question: "Define a GraphQL union `SearchResult` of `User` and `Post`.",
    expectedAnswer: `union SearchResult = User | Post`,
    starterCode: `union SearchResult = // types here`,
  },
  // 7
  {
    type: "code",
    question: "Write a query using inline fragments on a union `SearchResult`.",
    expectedAnswer: `query {
  search(term: "GraphQL") {
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
    starterCode: `query {
  search(term: "") {
    // inline fragments here
  }
}`,
  },
  // 8
  {
    type: "checkbox",
    question: "Which are valid GraphQL best practices?",
    options: [
      { text: "Use batching to reduce round-trips.", correct: true },
      { text: "Disable introspection in production if security-sensitive.", correct: true },
      { text: "Always over-fetch to ensure all data is available.", correct: false },
      { text: "Use schema documentation with descriptions.", correct: true },
    ],
  },
  // 9
  {
    type: "code",
    question: "Write a GraphQL type `Comment` with fields `id: ID!`, `content: String!`, `author: User!`.",
    expectedAnswer: `type Comment {
  id: ID!
  content: String!
  author: User!
}`,
    starterCode: `type Comment {
  // fields here
}`,
  },
  // 10
  {
    type: "checkbox",
    question: "Which are GraphQL federation concepts?",
    options: [
      { text: "Entities", correct: true },
      { text: "Resolvers", correct: true },
      { text: "Service boundaries", correct: true },
      { text: "Triggers", correct: false },
    ],
  },
  // 11
  {
    type: "code",
    question: "Write a query using aliasing to fetch two users with different IDs.",
    expectedAnswer: `query {
  first: user(id: "1") {
    name
  }
  second: user(id: "2") {
    name
  }
}`,
    starterCode: `query {
  // alias query here
}`,
  },
  // 12
  {
    type: "checkbox",
    question: "Which statements about GraphQL error handling are true?",
    options: [
      { text: "Errors are returned in the `errors` key of response.", correct: true },
      { text: "GraphQL returns both `data` and `errors` keys together.", correct: true },
      { text: "Errors are always fatal, no partial data is returned.", correct: false },
      { text: "Validation errors occur before execution.", correct: true },
    ],
  },
  // 13
  {
    type: "code",
    question: "Write a query using variables to get a post by `id` and return `title`.",
    expectedAnswer: `query getPost($id: ID!) {
  post(id: $id) {
    title
  }
}`,
    starterCode: `query getPost($id: ID!) {
  post(id: $id) {
    // field
  }
}`,
  },
  // 14
  {
    type: "checkbox",
    question: "Which are true about GraphQL directives?",
    options: [
      { text: "They can modify query execution.", correct: true },
      { text: "They can be custom-defined.", correct: true },
      { text: "They work only with mutations.", correct: false },
      { text: "Built-in ones are @include, @skip, @deprecated.", correct: true },
    ],
  },
  // 15
  {
    type: "code",
    question: "Write a query using `@deprecated` directive on a field `oldField`.",
    expectedAnswer: `type User {
  id: ID!
  oldField: String @deprecated(reason: "Use newField instead")
  newField: String
}`,
    starterCode: `type User {
  // fields here
}`,
  },
  // 16
  {
    type: "checkbox",
    question: "Which features help optimize GraphQL performance?",
    options: [
      { text: "Query batching", correct: true },
      { text: "Dataloader pattern", correct: true },
      { text: "Excessive nesting", correct: false },
      { text: "Persisted queries", correct: true },
    ],
  },
  // 17
  {
    type: "code",
    question: "Write a GraphQL interface `Node` with `id: ID!` and implement it in `User` type.",
    expectedAnswer: `interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
}`,
    starterCode: `interface Node {
  // field here
}

type User implements Node {
  // implement here
}`,
  },
  // 18
  {
    type: "checkbox",
    question: "Which are valid GraphQL scalar extensions?",
    options: [
      { text: "Date", correct: true },
      { text: "URL", correct: true },
      { text: "JSON", correct: true },
      { text: "Float64", correct: false },
    ],
  },
  // 19
  {
    type: "code",
    question: "Write a GraphQL query to fetch nested data: a post with its author’s name.",
    expectedAnswer: `query {
  post(id: "1") {
    title
    author {
      name
    }
  }
}`,
    starterCode: `query {
  post(id: "1") {
    // fields
  }
}`,
  },
  // 20
  {
    type: "checkbox",
    question: "Which are true about GraphQL schema stitching?",
    options: [
      { text: "It combines multiple schemas into one.", correct: true },
      { text: "It requires federated gateways.", correct: false },
      { text: "It is useful for microservices.", correct: true },
      { text: "It only works with REST APIs.", correct: false },
    ],
  },
];

// ---------------- React Component ----------------
function Paracticegraphql() {
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
     localStorage.setItem("course_practicegraphql_progress", progress);
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
      localStorage.setItem("course_practicegraphql_completed", "true");
      localStorage.setItem("course_practicegraphql_progress", "100");

      alert("🎉 Congratulations! You completed the HTML course!");

      window.location.href = "/complete";
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

export default Paracticegraphql;
