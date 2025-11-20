import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import '../index.css';

const Home = () => {
    const [emoji, setEmoji] = useState(null);
    const navigate = useNavigate();

    const decodeHtmlEmoji = (htmlCodeArray) => {
        if (!htmlCodeArray || htmlCodeArray.length === 0) return "";
        const code = htmlCodeArray[0].replace(/[&#;]/g, "");
        return String.fromCodePoint(parseInt(code, 10));
    };

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

    return (
        <div className="home-container">
            <h1 className="home-title">Memorji</h1>
            <p>Sign In</p>
            {emoji ? (
                <>
                    <p className="emoji-display">
                        {decodeHtmlEmoji(emoji.htmlCode)}
                    </p>

                    <button onClick={() => navigate("/game")}>Start</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Home;