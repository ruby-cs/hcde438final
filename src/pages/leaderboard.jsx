import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import "../index.css";
import "../App.css";

// Leaderboard page for user's scores
const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const username = localStorage.getItem("username");

  // Fetch top 10 scores for the user from Firestore
  useEffect(() => {
    if (!username || username === "Guest") return; // no scores for guests

    const fetchScores = async () => {
      try {
        const scoresRef = collection(db, "users", username, "scores");
        const q = query(scoresRef, orderBy("score", "desc"), limit(10));
        const querySnapshot = await getDocs(q);

        const topScores = querySnapshot.docs.map((doc) => doc.data());
        setScores(topScores);
      } catch (err) {
        console.error("Error fetching scores:", err);
      }
    };

    fetchScores();
  }, [username]);

  // If no username, user needs to enter one to save/view scores
  if (!username) {
    return <p>Please enter a username to see your leaderboard.</p>;
  }

  // If guest, user needs to enter username to save/view scores
  if (username === "Guest") {
    return <p>You are playing as a guest. Enter a username to save and view your scores.</p>;
  }

  // Leaderboard UI
  return (
    <div className="leaderboard-container">
      <h1>{username}'s Top 10 Scores</h1>
      <ul className="leaderboard-list">
        {scores.length > 0 ? (
          scores.map((score, i) => (
            <li key={i}>
              Score: {score.score} -{" "}
              {score.timestamp
                ? score.timestamp.toDate().toLocaleString()
                : "No date"}
            </li>
          ))
        ) : (
          <li>No scores yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;