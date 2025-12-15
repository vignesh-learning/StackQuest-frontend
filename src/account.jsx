import React, { useState, useEffect } from "react";
import "./account.css";

function Account() {
  const savedData = JSON.parse(localStorage.getItem("profileData")) || {};

  const [profileImage, setProfileImage] = useState(
    savedData.profileImage || "https://via.placeholder.com/120"
  );
  const [name, setName] = useState(savedData.name || "");
  const [phone, setPhone] = useState(savedData.phone || "");
  const [email, setEmail] = useState(savedData.email || "");
  const [github, setGithub] = useState(savedData.github || "");
  const [linkedin, setLinkedin] = useState(savedData.linkedin || "");
  const [skills, setSkills] = useState(savedData.skills || "");
  const [description, setDescription] = useState(savedData.description || "");

  const [dailyStreak, setDailyStreak] = useState(0);
  const [daysUsed, setDaysUsed] = useState(0);
  const [contestCount, setContestCount] = useState(0);

  const uploadProfile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setProfileImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    localStorage.setItem(
      "profileData",
      JSON.stringify({
        profileImage,
        name,
        phone,
        email,
        github,
        linkedin,
        skills,
        description,
      })
    );
    alert("Profile Saved Successfully ✔");
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const stored = JSON.parse(localStorage.getItem("dailyStreak")) || {
      streak: 0,
      lastSolvedDate: null,
      history: [],
    };

    let { streak, lastSolvedDate, history } = stored;

    if (lastSolvedDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yDate = yesterday.toISOString().split("T")[0];

      if (lastSolvedDate !== today && lastSolvedDate !== yDate) {
        streak = 0;
        history = [];
      }
    }

    setDailyStreak(streak);
    setDaysUsed(history.length);
    setContestCount(3);

    localStorage.setItem(
      "dailyStreak",
      JSON.stringify({ streak, lastSolvedDate, history })
    );
  }, []);

  const getStreakClass = () => {
    if (dailyStreak >= 150) return "streal-150";
    if (dailyStreak >= 100) return "streak-100";
    if (dailyStreak >= 50) return "streak-50";
    if (dailyStreak >= 5) return "streak-5";
    if (dailyStreak >= 1) return "streak-1";
    return "streak-0";
  };

  const getStreakBadgeText = () => {
    if (dailyStreak >= 100) return "🔥 100 Days Streak";
    if (dailyStreak >= 50) return "⚡ 50 Days Streak";
    if (dailyStreak >= 5) return "🏅 5 Days Streak";
    if (dailyStreak >= 1) return "✅";
    return "No Streak Yet";
  };

  return (
    <>
      <header className="main-header">
        <div className="header-left">
          <a href="/account">
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
        </div>
      </header>

      <div className="account-container">
        
        <div className="left-column">
          <div className="profile-box">
            <img src={profileImage} className="profile-img" />
            <button
              className="edit-btn"
              onClick={() =>
                document.getElementById("profileUpload").click()
              }
            >
              ✎
            </button>
            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={uploadProfile}
            />
          </div>

          <div className="profile-details">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />

            <label>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />

            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>GitHub</label>
            <input value={github} onChange={(e) => setGithub(e.target.value)} />

            <label>LinkedIn</label>
            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />

            <label>Skills</label>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className="save-btn" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>

        <div className="right-column">
          <div className="cardd">
            <h2>Account Overview</h2>
            <p>Days Used: <strong>{daysUsed}</strong></p>
            <p>Current Streak: <strong>{dailyStreak}</strong> days</p>

            <div className={`badge ${getStreakClass()}`}>
              {getStreakBadgeText()}
            </div>

            <p>Contest Participation: <strong>{contestCount}</strong></p>
            <p>Total Problems Solved: <strong>85</strong></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
