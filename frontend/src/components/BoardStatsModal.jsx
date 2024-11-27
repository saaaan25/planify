import useEstadisticasTablero from "../hooks/getEstadisticasTablero";

const EstadisticasTableroModal = ({ id, context, isOpen, closeModal }) => {
    const { estadisticas } = useEstadisticasTablero(id);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-800 absolute top-4 right-4"
                    >
                    &times;
                </button>
                <h2 className="text-xl font-bold text-center mb-4">
                    Estadísticas del {context === "espacio" ? "espacio" : "tablero"}
                </h2>

                <div className="bg-purple-100 p-2 rounded-md mb-4">
                    <h3 className="text-purple-800 text-center font-semibold">Resumen</h3>
                    <div className="flex justify-between mt-2">
                        <div>
                            <p className="text-sm text-gray-600">
                                {context === "espacio" ? "Tableros totales" : "Listas totales"}
                            </p>
                            <p className="text-lg font-bold text-gray-900">{estadisticas.listasTotales}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Actividades totales</p>
                            <p className="text-lg font-bold text-gray-900">{estadisticas.actividadesTotales}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-100 p-2 rounded-md mb-4">
                    <h3 className="text-purple-800 text-center font-semibold">Avance</h3>
                    <div className="flex justify-between mt-2">
                        <div>
                            <p className="text-sm text-gray-600">Actividades realizadas</p>
                            <p className="text-lg font-bold text-gray-900">{estadisticas.actividadesRealizadas}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Actividades faltantes</p>
                            <p className="text-lg font-bold text-gray-900">{estadisticas.actividadesFaltantes}</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-8 border-purple-200 flex justify-center items-center">
                                <p className="text-lg font-bold text-purple-800">
                                    {estadisticas.progreso}%
                                </p>
                            </div>
                            <div
                                className="absolute inset-0 rounded-full border-[8px] border-purple-600"
                                style={{
                                clipPath: `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`,
                                transform: `rotate(${estadisticas.progreso * 3.6}deg)`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={closeModal}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md mt-4 w-full"
                    >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default EstadisticasTableroModal;
