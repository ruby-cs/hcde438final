import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Leaderboard from "./pages/Leaderboard.jsx";
import Game from "./pages/Game.jsx";

const App = () => (
    <div id="app-container">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/game" element={<Game />} />
        </Routes>
    </div>
)

export default App;