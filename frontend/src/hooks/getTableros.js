import { useState, useEffect, useCallback } from "react";

const useFetchTableros = (idEspacio) => {
    const [tableros, setTableros] = useState([]);

    const fetchTableros = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/tableros");
            const data = await response.json();
            const filteredTableros = data.filter((tablero) => tablero.idEspacio === idEspacio);
            setTableros(filteredTableros);
        } catch (error) {
            console.error("Error fetching tableros:", error);
        }
    }, [idEspacio]);

    useEffect(() => {
        if (idEspacio) {
            fetchTableros();
        }
    }, [idEspacio, fetchTableros]);

    return { tableros, fetchTableros };
};

export default useFetchTableros;
