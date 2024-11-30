import { useState, useEffect } from 'react';

const useUsuariosPorEspacio = (idEspacio) => {
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!idEspacio) return;

        // Paso 1: Obtener las relaciones (idUsuario) para el espacio
        const fetchRelaciones = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/usuario_espacio/${idEspacio}`);
                const relaciones = await response.json();
                console.log("Estas son las coincidencias de idUsuario:", relaciones);

                if (!response.ok) {
                    throw new Error(relaciones.message || 'Error al obtener las relaciones');
                }

                // Paso 2: Obtener todos los usuarios
                const usuariosResponse = await fetch('http://localhost:5000/api/usuarios');
                const usuariosData = await usuariosResponse.json();

                if (!usuariosResponse.ok) {
                    throw new Error(usuariosData.message || 'Error al obtener los usuarios');
                }

                // Paso 3: Filtrar los usuarios que están en las relaciones obtenidas
                const usuariosFiltrados = usuariosData.filter(usuario =>
                    relaciones.some(relacion => relacion.idUsuario === usuario.idUsuario)
                );

                setUsuariosFiltrados(usuariosFiltrados);  // Establece los usuarios filtrados
            } catch (err) {
                setError('Error en la solicitud');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRelaciones();
    }, [idEspacio]);
    console.log(usuariosFiltrados)

    return { usuariosFiltrados, loading, error };
};

export default useUsuariosPorEspacio;