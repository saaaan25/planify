import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Space from './pages/Space'
import Board from './pages/Board'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/Register'
import PrivateRoute from "./components/PrivateRoute";


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes> 
                    {/* Rutas públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Rutas privadas */}
                    <Route path="/" element={<PrivateRoute element={Home} />} />
                    <Route path="/profile" element={<PrivateRoute element={Profile} />} />
                    <Route path="/:idEspacio" element={<PrivateRoute element={Space} />} />
                    <Route path="/:idEspacio/:idTablero" element={<PrivateRoute element={Board} />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
