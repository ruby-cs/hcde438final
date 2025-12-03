import React from 'react';
import { Link } from 'react-router-dom';

// Navbar component with links to Play and Leaderboard pages
const Navbar = () => (
    <nav>
        <Link to="/">Play</Link>
        <Link to="/leaderboard">Leaderboard</Link>
    </nav>
);

export default Navbar;