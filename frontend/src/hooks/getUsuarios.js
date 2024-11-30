import { useState, useCallback } from "react";

const useFetchUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/usuarios");
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error("Error fetching tableros:", error);
        }
    }, []);

    return { usuarios, fetchUsuarios };
};

export default useFetchUsuarios;
