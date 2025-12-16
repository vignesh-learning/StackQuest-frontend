import React from "react";
import "./practice.css";

function Practice() {
  return (
    <div>
      <header className="main-header">
        <div className="header-left">
          <a href="/account" style={{ textDecoration: "none", color: "inherit" }}>
            <i className="fa-regular fa-user"></i> Account
          </a>
        </div>
        <div className="header-right">
          <nav>
            <a href="/home">Home</a>
            <a href="/practice">Practice</a>
            <a href="/complete">Complete</a>
            <a href="/about">About</a>
          </nav>
          <div className="search-container">
            <input type="search" id="searchInput" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </header>

      <main>
        <Section title="Frontend Development" cards={[
          { link: "/html", image: "/html.png", title: "Practice HTML", desc: "Solve HTML Practice problems", details: "126 Problems left" },
          { link: "/css", image: "/css.jpeg", title: "Practice CSS", desc: "Solve CSS coding problems", details: "118 Problems left" },
          { link: "/js", image: "/js.png", title: "Practice JavaScript", desc: "Complete your JavaScript practice", details: "112 Problems left" },
          { link: "/advancedjs", image: "/advance javascript.png", title: "Practice Advanced JavaScript", desc: "Advanced JavaScript problems", details: "138 Problems left" },
          { link: "/reactt", image: "/react.jpeg", title: "Practice React Js", desc: "React Js problems", details: "138 Problems left" }
        ]} />

        <Section title="Backend Development" cards={[
          { link: "/node", image: "/node.png", title: "Practice Node.js Basics", desc: "Basic Node.js problems", details: "138 Problems left" },
          { link: "/express", image: "/node.png", title: "Practice Express.js", desc: "Advanced Express.js problems", details: "138 Problems left" },
          { link: "/mysql", image: "/mysql.png", title: "Practice MySQL", desc: "MySQL problems", details: "138 Problems left" },
          { link: "/graphql", image: "/GraphQL.png", title: "Practice GraphQL", desc: "GraphQL problems", details: "138 Problems left" },
          { link: "/django", image: "/Django.png", title: "Practice Django", desc: "Django problems", details: "138 Problems left" },
          { link: "/flask", image: "/flask.png", title: "Practice Flask", desc: "Flask problems", details: "138 Problems left" }
        ]} />
      </main>
    </div>
  );
}

function Section({ title, cards }) {
  return (
    <section>
      <header>
        <h1>{title}</h1>
      </header>
      <div className="container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <a href={card.link} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="icon-container">
                <img src={card.image} alt={`${card.title} Icon`} />
              </div>
              <h2>{card.title}</h2>
              <p>{card.desc}</p>
              <p className="details">{card.details}<br />Beginner level</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Practice;
