import { useState, useEffect, useCallback } from "react";

const useFetchActividades = (idLista) => {
    const [actividades, setActividades] = useState([]);
    console.log(idLista)

    const fetchActividades = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/actividades");
            const data = await response.json();

            const filteredAndSortedActivities = data
                .filter((actividad) => actividad.idLista === idLista)
                .sort((a, b) => {
                if (a.estado !== b.estado) return a.estado - b.estado;
        
                const dateA = new Date(a.actFecha);
                const dateB = new Date(b.actFecha);
                if (dateA - dateB !== 0) return dateA - dateB;
        
                const prioridadOrden = { Alta: 1, Media: 2, Baja: 3 };
                return prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad];
            });
        
            setActividades(filteredAndSortedActivities);
        } catch (error) {
            if (error.name === "TypeError") {
                console.error("Error de red o servidor no alcanzable.");
            } else {
                console.error("Error en la solicitud:", error);
            }
        }
      }, [idLista]);

    useEffect(() => {
        if (idLista) {
            fetchActividades();
        }
    }, [idLista, fetchActividades]);
    
    return { actividades, fetchActividades };
};

export default useFetchActividades;
