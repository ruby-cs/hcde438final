import React from 'react';
import { Link } from 'react-router-dom';

const navbar = () => (
    <nav>
        <Link to="/">Play</Link><br/>
        <Link to="/">Leaderboard</Link><br/>
        <Link to="/profile">Profile</Link><br/>
        <button>Sign Out</button>
    </nav>
);

export default navbar;