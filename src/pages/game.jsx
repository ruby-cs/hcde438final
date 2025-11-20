import React from 'react';
import { useState, useEffect } from "react";
import "../index.css";
import "../App.css";
import "../Game.css";

const EMOJIS = ["😀", "🔥", "⭐", "🍀", "🎵", "⚡", "🌙", "🍎"];

const Game = () => {
    const [sequence, setSequence] = useState([]);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [displaySequence, setDisplaySequence] = useState([]);
    const [isShowing, setIsShowing] = useState(true);

    useEffect(() => {
        startNewRound();
    }, []);

    const startNewRound = () => {
        const nextEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const newSequence = [...sequence, nextEmoji];
        setSequence(newSequence);
        showSequence(newSequence);
        setPlayerIndex(0);
    };

    const showSequence = (seq) => {
        setIsShowing(true);
        let idx = 0;

        const interval = setInterval(() => {
            setDisplaySequence([seq[idx]]);
            idx++;

            if (idx === seq.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setDisplaySequence([]);
                    setIsShowing(false);
                }, 500);
            }
        }, 800);
    };

    const click = (emoji) => {
        if (isShowing) return;

        if (emoji === sequence[playerIndex]) {
            if (playerIndex + 1 === sequence.length) {
                setTimeout(() => {
                    startNewRound();
                }, 600);
            } else {
                setPlayerIndex(playerIndex + 1);
            }
        } else {
            alert("Incorrect! New game.");
            const first = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
            setSequence([first]);
            showSequence([first]);
            setPlayerIndex(0);
        }
    };

    return (
        <div className="game-container">
            <h1>Memorji</h1>

            <div className="sequence-display">
                {displaySequence.map((emoji, idx) => (
                    <span key={idx} className="sequence-emoji">{emoji}</span>
                ))}
            </div>

            <div className="button-grid">
                {EMOJIS.map((emoji) => (
                    <button
                        key={emoji}
                        className="emoji-btn"
                        onClick={() => click(emoji)}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Game;