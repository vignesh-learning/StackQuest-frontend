import React from "react";
import { useNavigate } from "react-router-dom";
import "./practice.css";

function Complete() {
  const navigate = useNavigate();

  const practiceCards = [
    { 
      link: "/html", 
      image: "/html.png", 
      title: "Practice HTML", 
      desc: "Learn HTML", 
      details: "HTML", 
      certRoute: "/certificate/html", 
      completedKey: "course_html_completed" 
    },
    { 
      link: "/css", 
      image: "/css.jpeg", 
      title: "Practice CSS", 
      desc: "Style web pages", 
      details: "CSS",
      certRoute: "/certificate/css",
      completedKeys: [
        "css_stage1_completed",
        "css_stage2_completed",
        "css_stage3_completed"
      ]
    },
    { 
      link: "/js", 
      image: "/js.png", 
      title: "Practice JavaScript", 
      desc: "Core JS concepts", 
      details: "JavaScript", 
      certRoute: "/certificate/js", 
      completedKey: "course_js_completed" 
    },
     { 
      link: "/advancedjs", 
      image: "/advance javascript.png", 
      title: "Practice Advanced JavaScript", 
      desc: "Core JS concepts", 
      details: "JavaScript", 
      certRoute: "/certificate/advancedjs", 
      completedKey: "course_advancedjs_completed" 
    },
    { 
      link: "/reactt", 
      image: "/react.jpeg", 
      title: "Practice React", 
      desc: "Build UI with React", 
      details: "React", 
      certRoute: "/certificate/react", 
      completedKey: "course_react_completed" 
    },
    { 
      link: "/node", 
      image: "/node.png", 
      title: "Practice Node.js", 
      desc: "Backend with Node", 
      details: "Node.js", 
      certRoute: "/certificate/node", 
      completedKey: "course_node_completed" 
    },
     { 
      link: "/express", 
      image: "/node.png", 
      title: "Practice Express.js", 
      desc: "Backend with Node", 
      details: "Express.js", 
      certRoute: "/certificate/express", 
      completedKey: "course_express_completed" 
    },
    { 
      link: "/mysql", 
      image: "/mysql.png", 
      title: "Practice MySQL", 
      desc: "Database fundamentals", 
      details: "MySQL", 
      certRoute: "/certificate/mysql", 
      completedKey: "course_mysql_completed" 
    },
    {
      link: "/graphql",
      image: "/GraphQl.png",
      title: "Practice GraphQl",
      desc: "Full-stack fundamentals",
      details: "Graphql",
      certRoute: "/certificate/graphql",
      completedKeys: [
          "course_module1_completed",
          "course_module2_completed",
          "course_module3_completed",
          "course_module4_completed",
          "course_module5_completed",
          "course_practicegraphql_completed"
      ]
    },
     { 
      link: "/django", 
      image: "/Django.png", 
      title: "Practice Django", 
      desc: "Core Django concepts", 
      details: "Django", 
      certRoute: "/certificate/django", 
      completedKey: "course_django_completed" 
    },
     { 
      link: "/flask", 
      image: "/flask.png", 
      title: "Practice Flask", 
      desc: "Core Flask concepts", 
      details: "Flask", 
      certRoute: "/certificate/flask", 
      completedKey: "course_flask_completed" 
    }
  ];

  return (
    <div>
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
        </div>
      </header>

      <main>
        <section>
          <h1>Practice Courses</h1>
          <div className="container">
            {practiceCards.map((card, index) => {
              // Determine completion
              let isCompleted = false;

              if (card.completedKey) {
                isCompleted = localStorage.getItem(card.completedKey) === "true";
              } else if (card.completedKeys) {
                // For CSS, check all three stages
                isCompleted = card.completedKeys.every(
                  (key) => localStorage.getItem(key) === "true"
                );
              }

              // For CSS, show progress per stage
              const progressText = card.completedKeys
                ? card.completedKeys
                    .map((key, i) => {
                      const stageNames = ["Beginner", "Intermediate", "Advanced"];
                      return localStorage.getItem(key) === "true"
                        ? `✅ ${stageNames[i]}`
                        : `🔒 ${stageNames[i]}`;
                    })
                    .join(" | ")
                : "";

              return (
                <div
                  className="card"
                  key={index}
                  onClick={() => isCompleted && navigate(card.certRoute)}
                  style={{ cursor: isCompleted ? "pointer" : "not-allowed", opacity: isCompleted ? 1 : 0.5 }}
                >
                  <img src={card.image} alt={card.title} />
                  <h2>{card.title}</h2>
                  <p>{card.desc}</p>

                  <p className="details">
                    {card.details} <br />
                    {isCompleted ? "✅ Certificate Available" : "🔒 Complete course to unlock"}
                  </p>

                  {/* Show CSS stage progress */}
                  {progressText && <p className="details">{progressText}</p>}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Complete;
