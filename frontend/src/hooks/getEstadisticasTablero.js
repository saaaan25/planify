import { useState, useEffect, useCallback } from "react";
import useFetchTableros from "./getTableros";
import useFetchListas from "./getListas";

const useEstadisticasTablero = (idTablero) => {
    const { tableros } = useFetchTableros(idTablero);
    const { listas, fetchListas } = useFetchListas(idTablero); 
    const [actividades, setActividades] = useState([]); 
    const [estadisticas, setEstadisticas] = useState({
        listasTotales: 0,
        actividadesTotales: 0,
        actividadesRealizadas: 0,
        actividadesFaltantes: 0,
        progreso: 0,
    });

    const [updateFlag, setUpdateFlag] = useState(false);

    const fetchActividadesForListas = useCallback(async () => {
        try {
            const actividadesPromises = listas.map((lista) =>
                fetch(`http://localhost:5000/api/actividades?idLista=${lista.idLista}`)
                .then((response) => response.json()) 
            );

            const actividadesData = await Promise.all(actividadesPromises);
            
            const actividadesFlattened = actividadesData.flat();
            
            const actividadesFiltradas = actividadesFlattened.filter((actividad) =>
                listas.some((lista) => lista.idLista === actividad.idLista)
            );

            const actividadesUnicas = [
                ...new Map(actividadesFiltradas.map((actividad) => [actividad.idActividad, actividad])).values()
            ];

            setActividades(actividadesUnicas);
        } catch (error) {
            console.error("Error al obtener actividades:", error);
        }
    }, [listas]); 

    useEffect(() => {
        const fetchData = async () => {
            await fetchListas();
            fetchActividadesForListas();
        };

        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, [fetchActividadesForListas, fetchListas]);

    const agregarLista = (nuevaLista) => {
        fetchListas(); 
        setUpdateFlag(true);
    };

    const agregarActividad = (nuevaActividad) => {
        setUpdateFlag(true);
    };

    useEffect(() => {
        const listasTotales = listas.length;
        const actividadesTotales = actividades.length;
        const actividadesRealizadas = actividades.filter(
            (actividad) => actividad.estado === 1
        ).length;
        const actividadesFaltantes = actividadesTotales - actividadesRealizadas;
        const progreso =
        actividadesTotales > 0
            ? ((actividadesRealizadas / actividadesTotales) * 100).toFixed(2)
            : 0;

        setEstadisticas({
            listasTotales,
            actividadesTotales,
            actividadesRealizadas,
            actividadesFaltantes,
            progreso,
        });
    }, [listas, actividades]);

    return { estadisticas, tableros, listas, actividades, agregarLista, agregarActividad };
};

export default useEstadisticasTablero;