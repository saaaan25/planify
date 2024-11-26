import { useState, useEffect, useContext } from "react";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { FiEdit } from 'react-icons/fi';

const UpdateActivityButton = ({ activity, onUpdate, idLista }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        actTitulo: "",
        actDescripcion: "",
        actFecha: "",
        prioridad: "Alta",
        estado: 0,
        idLista: idLista,
        idUsuario: user.idUsuario,
    });

    useEffect(() => {
        if (activity) {
            setFormData({
                ...activity,
                idLista: idLista,
                idUsuario: user.idUsuario,
            });
        }
    }, [activity, idLista, user.idUsuario]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/actividades/${activity.idActividad}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Error al actualizar la actividad");

            onUpdate();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al actualizar actividad:", error);
            alert("Ocurrió un error.");
        }
    };

    return (
        <div>
            <button
                className="flex text-black_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={() => setIsModalOpen(true)}
            >
                <FiEdit/>
                Editar
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-[450px] min-w-[450px] rounded-md shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Editar actividad</h2>
                            <button onClick={() => setIsModalOpen(false)}>
                                <MdClose size={20} />
                            </button>
                        </div>
                        <form>
                            <label className="block mb-4">
                                Título
                                <input
                                    type="text"
                                    className="w-full border px-2 py-1 mt-1"
                                    value={formData.actTitulo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, actTitulo: e.target.value })
                                    }
                                />
                            </label>
                            <label className="block mb-4">
                                Descripción
                                <textarea
                                    className="w-full border px-2 py-1 mt-1"
                                    value={formData.actDescripcion}
                                    onChange={(e) =>
                                        setFormData({ ...formData, actDescripcion: e.target.value })
                                    }
                                />
                            </label>
                            <label className="block mb-4">
                                Fecha
                                <input
                                    type="date"
                                    className="w-full border px-2 py-1 mt-1"
                                    value={formData.actFecha}
                                    onChange={(e) =>
                                        setFormData({ ...formData, actFecha: e.target.value })
                                    }
                                />
                            </label>
                            <label className="block mb-4">
                                Prioridad
                                <div className="flex gap-4 mt-1">
                                    {["Alta", "Media", "Baja"].map((prioridad) => (
                                        <label key={prioridad} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="prioridad"
                                                value={prioridad}
                                                checked={formData.prioridad === prioridad}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, prioridad: e.target.value })
                                                }
                                            />
                                            {prioridad}
                                        </label>
                                    ))}
                                </div>
                            </label>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-black px-4 py-2 rounded"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="bg-purple_1 text-white px-4 py-2 rounded"
                                    onClick={handleSubmit}
                                >
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateActivityButton;
