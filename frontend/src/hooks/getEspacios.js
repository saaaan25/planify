import { useState, useEffect, useCallback } from "react";

const useFetchEspacios = (idUsuario) => {
    const [espacios, setEspacios] = useState([]);

    const fetchEspacios = useCallback(async () => {
        try {
            const usuarioEspacioResponse = await fetch("http://localhost:5000/api/usuario_espacio");
            const usuarioEspacioData = await usuarioEspacioResponse.json();

            const userSpaces = usuarioEspacioData.filter(
                (rel) => rel.idUsuario === idUsuario
            );

            const espaciosIds = userSpaces.map((rel) => rel.idEspacio);

            const espaciosResponse = await fetch("http://localhost:5000/api/espacios");
            const espaciosData = await espaciosResponse.json();

            const filteredEspacios = espaciosData.filter((espacio) =>
                espaciosIds.includes(espacio.idEspacio)
            );

            setEspacios(filteredEspacios);
        } catch (err) {
            console.error("Error fetching espacios:", err);
        }
    }, [idUsuario]);

    useEffect(() => {
        if (idUsuario) {
            fetchEspacios();
        }
    }, [idUsuario, fetchEspacios]);

    return { espacios, fetchEspacios };
};

export default useFetchEspacios;
