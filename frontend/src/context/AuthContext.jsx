import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user"));
    
        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (email, contrasena) => {
        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                email,
                contrasena,
            });
    
            const { token, user } = response.data;
    
            // Verifica que 'user' contiene todos los atributos
            console.log('Datos del usuario:', user); // Aquí se debe mostrar todo el objeto 'user'
    
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
    
            setIsAuthenticated(true);
            setUser(user);
    
            return true;
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            setIsAuthenticated(false);
            return false;
        }
    };        

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
