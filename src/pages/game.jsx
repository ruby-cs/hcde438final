import React from "react";
import { useState, useEffect } from "react";
import "../index.css";
import "../App.css";
import "../Game.css";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const saveUserScore = async (username, score) => {
  if (!username || username === "Guest") return;

  try {
    const scoreRef = collection(db, "users", username, "scores");

    await addDoc(scoreRef, {
      score,
      timestamp: serverTimestamp(),
    });

    console.log("Score saved for user:", username);
  } catch (err) {
    console.error("Error saving score:", err);
  }
};

const Game = () => {
  const username = localStorage.getItem("username") || "Guest";
  const [emojiList, setEmojiList] = useState([]);
  const [buttonEmojis, setButtonEmojis] = useState([]);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playTick, setPlayTick] = useState(0);
  const [score, setScore] = useState(0);

  const decodeHtmlEmoji = (htmlCodeArray) => {
    if (!htmlCodeArray || !htmlCodeArray.length) return "";
    const code = htmlCodeArray[0].replace(/[&#;]/g, "");
    return String.fromCodePoint(parseInt(code, 10));
  };

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch("https://emojihub.yurace.pro/api/all");
        const data = await response.json();
        const cleaned = data.filter((e) => e.htmlCode?.length);
        setEmojiList(cleaned);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchEmojis();
  }, []);

  useEffect(() => {
    if (!loading && emojiList.length > 0) {
      generateButtonSet();
    }
  }, [loading, emojiList]);

  const generateButtonSet = () => {
    const shuffled = [...emojiList]
      .sort(() => Math.random() - 0.5)
      .slice(0, 9);

    const decoded = shuffled.map((e) => decodeHtmlEmoji(e.htmlCode));

    setButtonEmojis(decoded);

    startNewGame(decoded);
  };

  const startNewGame = (buttons) => {
    const first = buttons[Math.floor(Math.random() * buttons.length)];
    const initial = [first];
    setSequence(initial);
    playSequence(initial);
  };

  const playSequence = async (seq) => {
    setShowingSequence(true);

    for (let i = 0; i < seq.length; i++) {
      setCurrentIndex(i);
      setPlayTick((t) => t + 1);
      await sleep(900);

      setCurrentIndex(null);
      await sleep(300);
    }

    setShowingSequence(false);
  };

  const handleUserClick = (emoji) => {
    if (showingSequence) return;

    const updated = [...userInput, emoji];
    setUserInput(updated);

    if (emoji !== sequence[updated.length - 1]) {
      saveUserScore(username, score);
      alert(`Incorrect! Your score was: ${score}. Restarting game.`);
      setUserInput([]);
      setSequence([]);
      setScore(0);
      generateButtonSet();
      return;
    }

    if (updated.length === sequence.length) {
      setUserInput([]);
      setScore(score + 1);
      const next = buttonEmojis[Math.floor(Math.random() * buttonEmojis.length)];
      const newSequence = [...sequence, next];
      setSequence(newSequence);

      setTimeout(() => playSequence(newSequence), 700);
    }
  };

  return (
    <div className="game-container">
      <h1>Memorji</h1>
      <h2>Player: {username}</h2>
      <h2>Score: {score}</h2>
      {loading ? (
        <p>Loading emojis...</p>
      ) : (
        <>
          <div className="sequence-display">
            {showingSequence && currentIndex !== null ? (
              <span key={playTick} className="sequence-emoji">
                {sequence[currentIndex]}
              </span>
            ) : null}
          </div>

          <div className="emoji-btn-grid">
            {buttonEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleUserClick(emoji)}
                className="emoji-btn"
                disabled={showingSequence}
              >
                {emoji}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;