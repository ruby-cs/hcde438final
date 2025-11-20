import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/">Play</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/profile">Profile</Link>
    </nav>
);

export default Navbar;