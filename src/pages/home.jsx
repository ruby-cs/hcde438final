import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import '../App.css';
import '../index.css';

const Home = () => {
  const [emoji, setEmoji] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const decodeHtmlEmoji = (htmlCodeArray) => {
    if (!htmlCodeArray || htmlCodeArray.length === 0) return "";
    const code = htmlCodeArray[0].replace(/[&#;]/g, "");
    return String.fromCodePoint(parseInt(code, 10));
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchEmoji = async () => {
      try {
        const response = await fetch("https://emojihub.yurace.pro/api/all");
        const data = await response.json();
        const randomEmoji = data[Math.floor(Math.random() * data.length)];
        setEmoji(randomEmoji);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchEmoji();
  }, []);

  const addUsername = async (e) => {
    e.preventDefault();

    const trimmed = username.trim();

    if (trimmed === "") {
      localStorage.setItem("username", "Guest");
      setUsername("Guest");
      navigate("/game");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), trimmed);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, { username: trimmed });
        console.log("Created new user:", trimmed);
      } else {
        console.log("User exists:", trimmed);
      }

      localStorage.setItem("username", trimmed);
      setUsername(trimmed);
      navigate("/game");
    } catch (error) {
      console.error("Error adding username:", error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Memorji</h1>

      <form onSubmit={addUsername} className="username-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username (or play as Guest)"
          className="username-input"
        />
        <button type="submit" className="add-button">Start</button>
      </form>

      {emoji ? (
        <p className="emoji-display">{decodeHtmlEmoji(emoji.htmlCode)}</p>
      ) : (
        <p>Loading...</p>
      )}

      {username && username !== "Guest" && (
        <p className="welcome-text">Welcome, <strong>{username}</strong>!</p>
      )}
    </div>
  );
};

export default Home;