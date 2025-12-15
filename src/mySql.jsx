import React, { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import "./mysql.css";

const questions = [
  {
    question: "Which of the following are valid SQL commands?",
    type: "checkbox",
    options: ["SELECT", "DELETE", "PUSH", "DROP"],
    correct: [0, 1, 3],
  },
  {
    question: "Write a SQL command to create a table named `users` with `id` and `name`.",
    type: "code",
    correctCode: "CREATE TABLE users (id INT, name VARCHAR(100));",
  }, {
    id: 1,
    type: "checkbox",
    question: "Which SQL command is used to retrieve data from a table?",
    options: [
      { text: "SELECT", correct: true },
      { text: "FETCH", correct: false },
      { text: "GET", correct: false },
      { text: "READ", correct: false }
    ]
  },
  {
    id: 2,
    type: "code",
    question: "Write a query to create a table called `employees` with `emp_id`, `name`, and `salary`.",
    expectedAnswer: `CREATE TABLE employees (
  emp_id INT PRIMARY KEY,
  name VARCHAR(100),
  salary DECIMAL(10, 2)
);`
  },
  {
    id: 3,
    type: "checkbox",
    question: "Which of the following is a valid constraint in MySQL?",
    options: [
      { text: "PRIMARY KEY", correct: true },
      { text: "LIMIT", correct: false },
      { text: "CONCAT", correct: false },
      { text: "MAX", correct: false }
    ]
  },
  {
    id: 4,
    type: "code",
    question: "Insert a record into `employees` with ID 101, name 'Alice', and salary 50000.",
    expectedAnswer: `INSERT INTO employees (emp_id, name, salary)
VALUES (101, 'Alice', 50000);`
  },
  {
    id: 5,
    type: "checkbox",
    question: "Which keyword is used to remove duplicates in SELECT results?",
    options: [
      { text: "DISTINCT", correct: true },
      { text: "UNIQUE", correct: false },
      { text: "SEPARATE", correct: false },
      { text: "FILTER", correct: false }
    ]
  },
  {
    id: 6,
    type: "code",
    question: "Update salary to 60000 where employee ID is 101.",
    expectedAnswer: `UPDATE employees
SET salary = 60000
WHERE emp_id = 101;`
  },
  {
    id: 7,
    type: "code",
    question: "Delete the employee with ID 101.",
    expectedAnswer: `DELETE FROM employees
WHERE emp_id = 101;`
  },
  {
    id: 8,
    type: "checkbox",
    question: "Which SQL clause is used to sort results?",
    options: [
      { text: "ORDER BY", correct: true },
      { text: "GROUP BY", correct: false },
      { text: "SORT", correct: false },
      { text: "FILTER BY", correct: false }
    ]
  },
  {
    id: 9,
    type: "code",
    question: "Retrieve names of all employees with salary > 40000.",
    expectedAnswer: `SELECT name FROM employees
WHERE salary > 40000;`
  },
  {
    id: 10,
    type: "code",
    question: "Create a table `departments` with `dept_id` (primary key) and `dept_name`.",
    expectedAnswer: `CREATE TABLE departments (
  dept_id INT PRIMARY KEY,
  dept_name VARCHAR(50)
);`
  },
  {
    id: 11,
    type: "checkbox",
    question: "Which type of JOIN returns all rows when there is a match in either table?",
    options: [
      { text: "FULL JOIN", correct: true },
      { text: "LEFT JOIN", correct: false },
      { text: "INNER JOIN", correct: false },
      { text: "CROSS JOIN", correct: false }
    ]
  },
  {
    id: 12,
    type: "code",
    question: "Select all employees sorted by salary in descending order.",
    expectedAnswer: `SELECT * FROM employees
ORDER BY salary DESC;`
  },
  {
    id: 13,
    type: "checkbox",
    question: "Which of the following is not a valid SQL data type?",
    options: [
      { text: "VARCHAR", correct: false },
      { text: "INTEGER", correct: false },
      { text: "TEXT", correct: false },
      { text: "FLOATING", correct: true }
    ]
  },
  {
    id: 14,
    type: "code",
    question: "Count total number of employees in the `employees` table.",
    expectedAnswer: `SELECT COUNT(*) FROM employees;`
  },
  {
    id: 15,
    type: "code",
    question: "Add a new column `email` to the `employees` table.",
    expectedAnswer: `ALTER TABLE employees
ADD email VARCHAR(100);`
  },
  {
    id: 16,
    type: "checkbox",
    question: "Which SQL function returns the current date?",
    options: [
      { text: "NOW()", correct: true },
      { text: "TODAY()", correct: false },
      { text: "CURRENT()", correct: false },
      { text: "DATE()", correct: false }
    ]
  },
  {
    id: 17,
    type: "code",
    question: "Find the average salary of employees.",
    expectedAnswer: `SELECT AVG(salary) FROM employees;`
  },
  {
    id: 18,
    type: "code",
    question: "Rename the column `name` to `emp_name` in the `employees` table.",
    expectedAnswer: `ALTER TABLE employees
CHANGE name emp_name VARCHAR(100);`
  },
  {
    id: 19,
    type: "checkbox",
    question: "Which clause is used to filter records after aggregation?",
    options: [
      { text: "HAVING", correct: true },
      { text: "WHERE", correct: false },
      { text: "FILTER", correct: false },
      { text: "GROUP", correct: false }
    ]
  },
  {
    id: 20,
    type: "code",
    question: "Drop the `departments` table from the database.",
    expectedAnswer: `DROP TABLE departments;`
  },
  {
    id: 21,
    type: "code",
    question: "Create an index on the `salary` column of `employees` table.",
    expectedAnswer: `CREATE INDEX idx_salary ON employees(salary);`
  },
  {
    id: 22,
    type: "checkbox",
    question: "Which SQL statement is used to give a column an alias?",
    options: [
      { text: "AS", correct: true },
      { text: "LIKE", correct: false },
      { text: "RENAME", correct: false },
      { text: "CHANGE", correct: false }
    ]
  },
  {
    id: 23,
    type: "code",
    question: "Find all employees whose name starts with 'A'.",
    expectedAnswer: `SELECT * FROM employees
WHERE name LIKE 'A%';`
  },
  {
    id: 24,
    type: "code",
    question: "Create a view called `high_earners` for employees with salary > 70000.",
    expectedAnswer: `CREATE VIEW high_earners AS
SELECT * FROM employees
WHERE salary > 70000;`
  },
  {
    id: 25,
    type: "checkbox",
    question: "Which SQL command is used to modify a table's structure?",
    options: [
      { text: "ALTER TABLE", correct: true },
      { text: "MODIFY TABLE", correct: false },
      { text: "UPDATE STRUCTURE", correct: false },
      { text: "CHANGE TABLE", correct: false }
    ]
  },
  {
    id: 26,
    type: "code",
    question: "Grant SELECT permission on `employees` table to user 'john'.",
    expectedAnswer: `GRANT SELECT ON employees TO 'john'@'localhost';`
  },
  {
    id: 27,
    type: "code",
    question: "Revoke SELECT permission from user 'john'.",
    expectedAnswer: `REVOKE SELECT ON employees FROM 'john'@'localhost';`
  },
  {
    id: 28,
    type: "checkbox",
    question: "Which keyword is used to combine rows from two or more SELECT statements?",
    options: [
      { text: "UNION", correct: true },
      { text: "JOIN", correct: false },
      { text: "MERGE", correct: false },
      { text: "COMBINE", correct: false }
    ]
  },
  {
    id: 29,
    type: "code",
    question: "Write a query to find the highest salary in the `employees` table.",
    expectedAnswer: `SELECT MAX(salary) FROM employees;`
  },
  {
    id: 30,
    type: "code",
    question: "Truncate the `employees` table.",
    expectedAnswer: `TRUNCATE TABLE employees;`
  }
];
const mysqlTopics = [
   {
    title: "Introduction to MySQL",
    content: `MySQL is a popular open-source relational database management system (RDBMS) developed and maintained by Oracle Corporation. It is based on Structured Query Language (SQL), which is the standard language used to manage and manipulate databases.

MySQL is widely used in various applications, especially for web-based projects. It is a critical component of many technology stacks, such as the LAMP stack (Linux, Apache, MySQL, PHP/Python/Perl), which powers a large percentage of websites around the world.`,
    image: "mysqlimg.jpeg"
  },
  {
  title: "Key Features of MySQL:",
  content: `1. Open Source
MySQL is free and open-source software, meaning anyone can download, use, and modify it under the terms of the GNU General Public License.

2. Relational Database Management System (RDBMS)
It organizes data into one or more tables (rows and columns) where data types may be related to each other.

3. High Performance
MySQL is designed to be fast and efficient, handling large volumes of data and complex queries with minimal resource usage.

4. Scalability
It can handle small personal projects and scale up to large-scale enterprise applications with millions of queries per day.

5. Cross-Platform Support
MySQL can run on various operating systems, including Windows, Linux, macOS, and Unix.

6. Security
Provides advanced security features like password encryption, user privilege management, and secure connections using SSL.

7. Replication and Clustering
Supports master-slave replication, master-master replication, and clustering for high availability and disaster recovery.

8. Compatibility with Standard SQL
MySQL uses standard SQL (Structured Query Language), which makes it easy for users to transition from other RDBMS systems.

9. GUI Tools Support
Tools like MySQL Workbench provide a graphical interface for designing, managing, and optimizing databases.

10. Support for Stored Procedures and Triggers
Developers can use stored procedures, triggers, and views to implement complex logic at the database level.

11. Community and Documentation
MySQL has strong community support, with extensive documentation and a wide variety of tutorials and forums.

12. Integration Capabilities
Easily integrates with popular programming languages like PHP, Python, Java, C#, and web servers like Apache and Nginx.`,
  image: "features.jpeg"
},
 {
  title: "What is SQL ?",
  content: `SQL (Structured Query Language) is a standardized programming language used to manage and manipulate relational databases. It allows you to interact with databases by performing tasks such as:

- Creating and modifying database structures (like tables)
- Inserting, updating, and deleting data
- Querying data to retrieve specific information
- Controlling access and permissions`,
  image: "sqlimg.jpeg"
},{
  title: "What is DataBase ?",
   content: `A database is a structured collection of data that is stored in a computer system and is designed to manage, retrieve, and update data efficiently. It enables users to store, organize, manipulate, and access data with minimal redundancy and maximum accuracy.

🔹 Key Definitions:
Data: Raw facts and figures without context. Example: “Arun”, “20”, “HTML”.

Database: A system that stores data in a structured way so it can be easily managed.

DBMS (Database Management System): Software that interacts with end users, applications, and the database to capture and analyze data.`,
    image: "databaseimg.jpeg"
},
 {
    title: "Data Types in MySQL",
    content: `MySQL supports a wide range of data types grouped into three categories:

1. Numeric Types – INT, BIGINT, FLOAT, DOUBLE, DECIMAL
2. String Types – CHAR, VARCHAR, TEXT, ENUM, SET
3. Date and Time Types – DATE, DATETIME, TIMESTAMP, TIME, YEAR

Choosing the correct data type is essential for data accuracy and storage optimization.`,
    image: "datatypes.png"
  },
  {
    title: "MySQL Constraints",
    content: `Constraints are rules enforced on table columns to maintain data integrity. Common MySQL constraints include:

1. NOT NULL – Ensures a column cannot have a NULL value.
2. UNIQUE – Ensures all values in a column are unique.
3. PRIMARY KEY – Uniquely identifies each record.
4. FOREIGN KEY – Links two tables.
5. CHECK – Ensures values in a column satisfy a condition.
6. DEFAULT – Sets a default value for a column.`,
    image: "constraints.jpeg"
  },
  {
    title: "MySQL CRUD Operations",
    content: `CRUD stands for Create, Read, Update, and Delete. These are the basic operations for managing records in a database.

1. INSERT – Adds a new record.
2. SELECT – Retrieves records.
3. UPDATE – Modifies existing records.
4. DELETE – Removes records.`,
    image: "curd.jpeg"
  },
  {
    title: "Joins in MySQL",
    content: `Joins are used to combine rows from two or more tables based on a related column.

1. INNER JOIN – Returns matching records from both tables.
2. LEFT JOIN – Returns all records from the left table and matched records from the right.
3. RIGHT JOIN – Returns all records from the right table and matched from the left.
4. FULL JOIN (not supported in MySQL directly, but can be emulated).`,
    image: "joins.jpeg"
  },
  {
    title: "MySQL Indexes",
    content: `Indexes improve the speed of data retrieval but may slow down write operations.

Types of indexes:
1. PRIMARY – Automatically created on primary keys.
2. UNIQUE – Ensures values are unique.
3. FULLTEXT – Used for full-text searches.
4. SPATIAL – Used with spatial data.`,
    image: "indexes.jpeg"
  },
  {
    title: "MySQL Views",
    content: `A view is a virtual table based on the result set of a SQL statement. It does not store data itself.

Syntax:
CREATE VIEW view_name AS
SELECT column1, column2 FROM table WHERE condition;`,
    image: "view.jpeg"
  },
  {
    title: "Stored Procedures in MySQL",
    content: `Stored procedures are precompiled SQL statements stored in the database.

Benefits:
- Improve performance
- Reusable logic
- Better security

Syntax:
DELIMITER //
CREATE PROCEDURE proc_name()
BEGIN
  -- SQL Statements
END //
DELIMITER ;`,
    image: "procedure.jpeg"
  },
  {
    title: "Triggers in MySQL",
    content: `A trigger is a set of instructions that are automatically executed in response to specific events (INSERT, UPDATE, DELETE) on a table.

Syntax:
CREATE TRIGGER trigger_name
BEFORE INSERT ON table_name
FOR EACH ROW
BEGIN
  -- SQL code
END;`,
    image: "trigger.png"
  },
  {
    title: "Transactions in MySQL",
    content: `Transactions are used to ensure data integrity through the ACID properties (Atomicity, Consistency, Isolation, Durability).

Commands:
1. START TRANSACTION
2. COMMIT
3. ROLLBACK`,
    image: "transaction.jpeg"
  },
  {
    title: "Normalization in MySQL",
    content: `Normalization organizes data to reduce redundancy and improve integrity.

Common Normal Forms:
1NF – Eliminate duplicate columns
2NF – Remove partial dependencies
3NF – Remove transitive dependencies`,
    image: "normalization.jpeg"
  }
];

function Mysql() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showPractice, setShowPractice] = useState(false);

  const [theme, setTheme] = useState("dark-mode");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [code, setCode] = useState("");

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  useEffect(() => {
    if (showPractice) {
      setFeedback("");
      setSelectedOptions([]);
      setCode(currentQuestion.starterCode || "");

      const progress = Math.floor(((currentIndex + 1) / totalQuestions) * 100);
      localStorage.setItem("course_mysql_progress", progress);
    }
  }, [currentIndex, showPractice, currentQuestion.starterCode, totalQuestions]);

  const validateCheckboxAnswer = () => {
    const correct = currentQuestion.correct;
    const isCorrect =
      correct.length === selectedOptions.length &&
      correct.every((val) => selectedOptions.includes(val));
    setFeedback(isCorrect ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const validateCodeAnswer = () => {
    const user = code.trim().replace(/\s+/g, "");
    const expected = currentQuestion.correctCode.trim().replace(/\s+/g, "");
    setFeedback(user === expected ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions- 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      localStorage.setItem("course_mysql_completed", "true");
      localStorage.setItem("course_mysql_progress", "100");

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
    <div className={showPractice ? theme : "mysql-theory-container"} style={{ padding: "20px", fontFamily: "Arial" }}>
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
            <h2>{mysqlTopics[currentTopic].title}</h2>
            <pre
              className="theory-text"
              style={{
                whiteSpace: "pre-wrap",
                backgroundColor: "#f0f0f0",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              {mysqlTopics[currentTopic].content}
            </pre>

            <div className="topic-navigation" style={{ marginTop: "1rem" }}>
              <button
                onClick={() => setCurrentTopic((prev) => Math.max(prev - 1, 0))}
                disabled={currentTopic === 0}
                style={{ marginRight: "10px" }}
              >
                Previous Topic
              </button>

              {currentTopic < mysqlTopics.length - 1 ? (
                <button onClick={() => setCurrentTopic((prev) => prev + 1)}>Next Topic</button>
              ) : (
                <button onClick={() => setShowPractice(true)}>Start Practice</button>
              )}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <img
              src={mysqlTopics[currentTopic].image}
              alt={mysqlTopics[currentTopic].title}
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
                      {" " + opt}
                    </label>
                  ))}
                  <button onClick={validateCheckboxAnswer}>Submit Answer</button>
                </div>
              ) : (
                <div id="codeEditorContainer">
                  <CodeMirror
                    value={code}
                    height="200px"
                    extensions={[html()]}
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

export default Mysql;