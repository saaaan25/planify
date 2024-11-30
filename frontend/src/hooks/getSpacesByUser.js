import { useState, useEffect } from 'react';

const useEspaciosPorUsuario = (idUsuario) => {
    const [espaciosFiltrados, setEspaciosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!idUsuario) return;

        // Paso 1: Obtener las relaciones (idEspacio) para el usuario
        const fetchRelaciones = async () => {
            setLoading(true);
            try {
                // Hacemos la llamada para obtener los idEspacio para un usuario específico
                const response = await fetch(`http://localhost:5000/api/usuario_espacio/${idUsuario}`);
                const relaciones = await response.json();
                console.log("Estas son las coincidencias de idEspacio:", relaciones);

                if (!response.ok) {
                    throw new Error(relaciones.message || 'Error al obtener las relaciones');
                }

                // Paso 2: Obtener todos los espacios
                const espaciosResponse = await fetch('http://localhost:5000/api/espacios');
                const espaciosData = await espaciosResponse.json();

                if (!espaciosResponse.ok) {
                    throw new Error(espaciosData.message || 'Error al obtener los espacios');
                }

                // Paso 3: Filtrar los espacios que están en las relaciones obtenidas
                const espaciosFiltrados = espaciosData.filter(espacio =>
                    relaciones.some(relacion => relacion.idEspacio === espacio.idEspacio)
                );

                setEspaciosFiltrados(espaciosFiltrados);  // Establece los espacios filtrados
            } catch (err) {
                setError('Error en la solicitud');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRelaciones();
    }, [idUsuario]);

    return { espaciosFiltrados, loading, error };
};

export default useEspaciosPorUsuario;
