import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false); 
    }, []);

    const login = async (email, contrasena) => {
        try {
            const response = await axios.post("http://localhost:5000/api/login", { email, contrasena });
            const token = response.data.token;

            localStorage.setItem("token", token); 
            setIsAuthenticated(true);

            return true;
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token"); 
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
