import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import '../App.css';
import '../index.css';

// Home page with username input and random emoji display
const Home = () => {
  const [emoji, setEmoji] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Decode HTML emoji code to actual emoji character
  const decodeHtmlEmoji = (htmlCodeArray) => {
    if (!htmlCodeArray || htmlCodeArray.length === 0) return "";
    const code = htmlCodeArray[0].replace(/[&#;]/g, "");
    return String.fromCodePoint(parseInt(code, 10));
  };

  // Saved username retrieval
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);
  
  // Fetch random emoji
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

  // Add username to storage, then navigate to game page
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

  // Home page UI
  return (
    <div className="home-container">
      <h1 className="home-title">Memorji</h1>

      {emoji ? (
        <p className="emoji-display">{decodeHtmlEmoji(emoji.htmlCode)}</p>
      ) : (
        <p>Loading...</p>
      )}

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

      {username && username !== "Guest" && (
        <p className="welcome-text">Welcome, <strong>{username}</strong>!</p>
      )}

      <br></br>
      <p>This is Memoji, a sequence memory game! Memorize the randomly generated sequence of emojis and repeat it using the provided buttons. For each correct round, an additional emoji will be added to the sequence. If you input the sequence incorrectly, the game restarts. Try to get the highest score!</p>
    </div>
  );
};

export default Home;