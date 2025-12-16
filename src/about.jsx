import React from 'react';
import './about.css';

function About() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <header>
        <button onClick={goBack} className="back-btn">Go Back</button>
        <h1>Full-Stack Web Development</h1>
      </header>

      <main>
        <div className="img-container">
          <img src="/deatils img.jpeg" alt="Details Image" />
        </div>

        <section>
          <h2>1. What is Full-Stack Web Development?</h2>
          <p>Full-stack development combines:</p>
          <ul>
            <li><strong>Front-end Development:</strong> The part of a website users interact with directly, involving UI/UX design, layout, and interactivity.</li>
            <li><strong>Back-end Development:</strong> The server-side of the application that handles data storage, server logic, and communication between the front-end and the database.</li>
          </ul>
        </section>

        <section>
          <h2>2. Key Skills and Tools</h2>
          <h3>Front-End Development</h3>
          <p>Technologies for building the visual part of a web application:</p>
          <ul>
            <li><strong>Languages:</strong> HTML, CSS, JavaScript</li>
            <li><strong>Frameworks and Libraries:</strong> React.js, Angular.js, Vue.js, Bootstrap</li>
            <li><strong>Tools:</strong> Chrome Developer Tools, Figma, Adobe XD</li>
          </ul>
          <h3>Back-End Development</h3>
          <p>Technologies for application logic and server communication:</p>
          <ul>
            <li><strong>Languages:</strong> Node.js, Python, PHP, Ruby, Java</li>
            <li><strong>Frameworks:</strong> Express.js, Django, Flask, Laravel</li>
            <li><strong>Databases:</strong> MySQL, PostgreSQL, MongoDB</li>
            <li><strong>APIs:</strong> REST, GraphQL</li>
          </ul>
          <div className="section-img-container">
            <img src="/front end and back end mixed.jpeg" alt="Key Skills Image" />
          </div>
        </section>

        <section>
          <h2>3. Learning Path</h2>
          <p>Steps to becoming a full-stack developer:</p>
          <ul>
            <li>Learn the basics of HTML, CSS, and JavaScript.</li>
            <li>Master front-end frameworks like React.js or Angular.</li>
            <li>Understand back-end development using Node.js or Python.</li>
            <li>Learn database management with SQL and NoSQL.</li>
            <li>Practice version control with Git and GitHub.</li>
            <li>Build projects that combine front-end, back-end, and database.</li>
            <li>Learn deployment on platforms like AWS or Heroku.</li>
          </ul>
        </section>

        <section>
          <h2>4. Common Responsibilities of a Full-Stack Developer</h2>
          <ul>
            <li>Designing and maintaining front-end and back-end components.</li>
            <li>Creating APIs for seamless communication between client and server.</li>
            <li>Integrating third-party services (e.g., payment gateways).</li>
            <li>Ensuring responsive design for all devices.</li>
            <li>Debugging and testing code.</li>
          </ul>
        </section>

        <section>
          <h2>5. Full-Stack Development Projects</h2>
          <ul>
            <li>To-Do List: Build a task manager with React.js and Node.js.</li>
            <li>E-Commerce Website: Create an online shopping platform.</li>
            <li>Social Media App: Develop a platform with posting, commenting, and liking features.</li>
            <li>Real-Time Chat Application: Use WebSockets for real-time communication.</li>
            <li>Portfolio Website: Showcase your skills and projects.</li>
          </ul>
        </section>

        <section>
          <h2>6. Salary and Career Opportunities</h2>
          <p><strong>Salary:</strong> The average salary of a full-stack developer ranges from $70,000 to $120,000 annually, depending on experience and location.</p>
          <p><strong>Roles:</strong></p>
          <ul>
            <li>Junior Full-Stack Developer</li>
            <li>Senior Full-Stack Developer</li>
            <li>Technical Lead</li>
            <li>Freelance Developer</li>
          </ul>
        </section>
      </main>

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>mv2050286@gmail.com <i className="fa-solid fa-envelope"></i></p>
            <p><i className="fa-solid fa-phone-flip"></i> +91 9943782104</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <ul>
              <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
              <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
              <li><a href="https://www.instagram.com/m_r_c_h_i_k_k_a_m_4_2_0_?igsh=MTFkOWJ2eXVueGJrMA==" target="_blank">Instagram</a></li>
              <li><a href="https://www.linkedin.com/in/vignesh-m-bb9a59299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">LinkedIn</a></li>
            </ul>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Full-Stack Web Development. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;
