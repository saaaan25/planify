import React, { useState, useEffect } from "react";

const SortOptions = ({ lista, setEspaciosFiltrados, tipo }) => {
    const [opcionOrden, setOpcionOrden] = useState("antiguo");

    const aplicarOrden = () => {
        let listaOrdenada = [...lista];

        switch (opcionOrden) {
            case "reciente":
                if (tipo === "espacio") {
                    listaOrdenada = listaOrdenada.sort((a, b) => new Date(b.espFechaCreacion) - new Date(a.espFechaCreacion));
                } else {
                    listaOrdenada = listaOrdenada.sort((a, b) => new Date(b.tabFechaCreacion) - new Date(a.tabFechaCreacion));
                } 
                break;
            case "antiguo":
                if (tipo === "espacio") {
                    listaOrdenada = listaOrdenada.sort((a, b) => new Date(a.espFechaCreacion) - new Date(b.espFechaCreacion));
                } else {
                    listaOrdenada = listaOrdenada.sort((a, b) => new Date(a.tabFechaCreacion) - new Date(b.tabFechaCreacion));
                } 
                break;
            case "a_z":
                if (tipo === "espacio") {
                    listaOrdenada = listaOrdenada.sort((a, b) => a.espTitulo.localeCompare(b.espTitulo));
                } else {
                    listaOrdenada = listaOrdenada.sort((a, b) => a.tabTitulo.localeCompare(b.tabTitulo));
                }
                break;
            case "z_a":
                if (tipo === "espacio") {
                    listaOrdenada = listaOrdenada.sort((a, b) => b.espTitulo.localeCompare(a.espTitulo));
                } else {
                    listaOrdenada = listaOrdenada.sort((a, b) => b.tabTitulo.localeCompare(a.tabTitulo));
                }
                break;
            default:
                break;
        }

        setEspaciosFiltrados(listaOrdenada);
    };

    useEffect(() => {
        aplicarOrden();
    }, [opcionOrden, lista]);

    return (
        <div className="flex gap-4 items-center text-sm">
            <select
                value={opcionOrden}
                onChange={(e) => setOpcionOrden(e.target.value)}
                className="px-3 py-1 border border-black_1 focus:ring-0 focus:outline-none"
            >
                <option value="reciente">Más reciente</option>
                <option value="antiguo">Más antiguo</option>
                <option value="a_z">A - Z</option>
                <option value="z_a">Z - A</option>
            </select>
        </div>
    );
};

export default SortOptions;
