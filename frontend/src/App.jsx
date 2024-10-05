import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Space from './pages/Space'
import Board from './pages/Board'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
        <Router>
            <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/space" element={<Space />} />
                <Route path="/board" element={<Board />} />
            </Routes>
        </Router>
    )
}

export default App
