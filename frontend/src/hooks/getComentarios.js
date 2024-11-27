import { useState, useEffect, useCallback } from "react";

const useFetchComentarios = (idTablero) => {
    const [comentarios, setComentarios] = useState([]);

    const fetchComentarios = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/comentarios");
            const data = await response.json();
            const filteredComentarios = data.filter((comentario) => comentario.idTablero === idTablero);
            setComentarios(filteredComentarios);
        } catch (error) {
            console.error("Error fetching comentarios:", error);
        }
    }, [idTablero]);

    useEffect(() => {
        if (idTablero) {
            fetchComentarios();
        }
    }, [idTablero, fetchComentarios]);

    return { comentarios, fetchComentarios };
};

export default useFetchComentarios;
