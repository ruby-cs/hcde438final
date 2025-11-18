import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Leaderboard from "./pages/Leaderboard.jsx";

const App = () => (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </div>
)

export default App;