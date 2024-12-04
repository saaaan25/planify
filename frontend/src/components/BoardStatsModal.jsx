import useEstadisticasTablero from "../hooks/getEstadisticasTablero";
import { MdClose } from "react-icons/md";
import CircularProgress from "./CircularProgress";

const EstadisticasTableroModal = ({ id, context, isOpen, closeModal }) => {
    const { estadisticas } = useEstadisticasTablero(id);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-grey_1 py-6 px-10 rounded-lg shadow-lg w-96 min-w-[450px]">
                <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-800 absolute top-4 right-4"
                    >
                    &times;
                </button>
                <div className="w-full flex justify-between text-black_1 items-start">
                    <h2 className="text-2xl font-frankfurter mb-4">
                        Estadísticas del {context === "espacio" ? "espacio" : "tablero"}
                    </h2>
                    <button onClick={closeModal}>
                        <MdClose size={20}/>
                    </button>
                </div>
                <div className="p-2 rounded-md mb-3">
                    <h3 className="text-black_1 text-center font-semibold bg-purple_1 py-1">Resumen</h3>
                    <div className="grid justify-between mt-3 grid-cols-2 gap-x-4">
                        <div className="flex flex-col gap-y-1">
                            <p className="text-sm text-black_1 font-bold">
                                {context === "espacio" ? "Tableros totales" : "Listas totales"}
                            </p>
                            <p className="text-lg font-frankfurter text-black_1 py-1 w-full bg-white">{estadisticas.listasTotales}</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-sm text-black_1 font-bold">Actividades totales</p>
                            <p className="text-lg font-frankfurter text-black_1 py-1 w-full bg-white">{estadisticas.actividadesTotales}</p>
                        </div>
                    </div>
                </div>
                <div className="p-2 rounded-md mb-2">
                    <h3 className="text-black_1 text-center font-semibold bg-purple_1 py-1">Avance</h3>
                    <div className="grid justify-between mt-3 grid-cols-[3fr_2fr] gap-x-4">
                        <div className="flex flex-col gap-y-3">
                            <div className="flex flex-col gap-y-1">
                                <p className="text-sm text-black_1 font-bold">Actividades realizadas</p>
                                <p className="text-lg font-frankfurter text-black_1 py-1 w-full bg-white">{estadisticas.actividadesRealizadas}</p>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-sm text-black_1 font-bold">Actividades faltantes</p>
                                <p className="text-lg font-frankfurter text-black_1 py-1 w-full bg-white">{estadisticas.actividadesFaltantes}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <CircularProgress percentage={estadisticas.progreso} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasTableroModal;
