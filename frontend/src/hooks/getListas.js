import { useState, useEffect, useCallback } from "react";

const useFetchListas = (idTablero) => {
    const [listas, setListas] = useState([]);

    const fetchListas = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/listas");
            const data = await response.json();
            const filteredListas = data.filter((lista) => lista.idTablero === idTablero);
            setListas(filteredListas);
        } catch (error) {
            console.error("Error fetching listas:", error);
        }
    }, [idTablero]);

    useEffect(() => {
        if (idTablero) {
            fetchListas();
        }
    }, [idTablero, fetchListas]);

    return { listas, fetchListas };
};

export default useFetchListas;
