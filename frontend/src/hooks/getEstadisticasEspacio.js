import { useState, useEffect, useCallback } from "react";
import useFetchTableros from "./getTableros"; // Hook para obtener tableros
import useFetchListas from "./getListas"; // Hook para obtener listas
import useFetchActividades from "./getActividades"; // Hook para obtener actividades

const useEstadisticasEspacio = (idEspacio) => {
    const { tableros, fetchTableros } = useFetchTableros(idEspacio); // Obtener tableros por idEspacio
    const { listas, fetchListas } = useFetchListas(); // Obtener listas por idTablero
    const { actividades, fetchActividades } = useFetchActividades(); // Obtener actividades por idLista
    const [estadisticas, setEstadisticas] = useState({
        tablerosTotales: 0,
        listasTotales: 0,
        actividadesTotales: 0,
        actividadesRealizadas: 0,
        actividadesFaltantes: 0,
        progreso: 0,
    });

    // Función para obtener las actividades de cada lista
    const fetchActividadesForListas = useCallback(async (tableros) => {
        try {
            let allActividades = [];

            // Recorrer cada tablero
            for (const tablero of tableros) {
                // 1. Obtener las listas de cada tablero
                const listasDelTablero = await fetchListas(tablero.idTablero);

                // 2. Recorrer cada lista para obtener sus actividades
                for (const lista of listasDelTablero) {
                    const actividadesDeLista = await fetchActividades(lista.idLista);
                    allActividades = [...allActividades, ...actividadesDeLista];
                }
            }

            // Filtrar y eliminar duplicados
            const actividadesUnicas = [
                ...new Map(allActividades.map((actividad) => [actividad.idActividad, actividad])).values()
            ];

            // Actualizar el estado con las actividades únicas obtenidas
            setEstadisticas((prevState) => ({
                ...prevState,
                actividadesTotales: actividadesUnicas.length,
                actividadesRealizadas: actividadesUnicas.filter(actividad => actividad.estado === 1).length,
                actividadesFaltantes: actividadesUnicas.filter(actividad => actividad.estado !== 1).length,
                progreso: actividadesUnicas.length > 0 
                    ? ((actividadesUnicas.filter(actividad => actividad.estado === 1).length / actividadesUnicas.length) * 100).toFixed(2)
                    : 0,
            }));

        } catch (error) {
            console.error("Error al obtener actividades:", error);
        }
    }, [fetchListas, fetchActividades]);

    // Llamar a la función de obtener actividades cada vez que los tableros cambian
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Primero obtener los tableros del espacio
                await fetchTableros(idEspacio);
                // Luego obtener las actividades de todas las listas de esos tableros
                await fetchActividadesForListas(tableros);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData();
    }, [idEspacio, tableros, fetchTableros, fetchListas, fetchActividades, fetchActividadesForListas]);

    return { estadisticas, tableros, listas, actividades };
};

export default useEstadisticasEspacio;
