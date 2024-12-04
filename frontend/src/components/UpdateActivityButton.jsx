import { useState, useEffect, useContext } from "react";
import { MdClose } from "react-icons/md";
import { FiEdit } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import { AuthContext } from "../context/AuthContext";

const ModalEditarActividad = ({ isOpen, onClose, onUpdate, formData, setFormData, activity }) => {
    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/actividades/${activity.idActividad}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Error al actualizar la actividad");

            onUpdate();
            onClose();
        } catch (error) {
            console.error("Error al actualizar actividad:", error);
            alert("Ocurrió un error.");
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-grey_1 w-[450px] min-w-[450px] rounded-md shadow-lg py-6 px-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-frankfurter">Editar actividad</h2>
                    <button onClick={onClose}>
                        <MdClose size={20} />
                    </button>
                </div>
                <form>
                    <label className="block mb-4">
                        <p className="flex justify-start w-full">Título</p>
                        <input
                            type="text"
                            className="w-full border px-2 py-1 mt-1 border-black_1"
                            value={formData.actTitulo}
                            onChange={(e) =>
                                setFormData({ ...formData, actTitulo: e.target.value })
                            }
                        />
                    </label>
                    <label className="block mb-4">
                        <p className="flex justify-start w-full">Descripción</p>
                        <textarea
                            className="w-full border px-2 py-1 mt-1 border-black_1"
                            value={formData.actDescripcion}
                            onChange={(e) =>
                                setFormData({ ...formData, actDescripcion: e.target.value })
                            }
                        />
                    </label>
                    <div className="flex gap-x-4">
                        <label className="block mb-4">
                            <p className="flex justify-start w-full">Fecha</p>
                            <input
                                type="date"
                                className="w-full border px-2 py-1 mt-1 border-black_1"
                                value={formData.actFecha}
                                onChange={(e) =>
                                    setFormData({ ...formData, actFecha: e.target.value })
                                }
                            />
                        </label>
                        <label className="block mb-4">
                            <p className="flex justify-start w-full mb-3">Prioridad</p>
                            <div className="flex gap-4 mt-1 text-xs">
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
                    </div>

                    <div className="flex justify-center gap-2">
                        <button
                            type="button"
                            className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                            onClick={handleSubmit}
                        >
                            Aceptar
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

const UpdateActivityButton = ({ activity, onUpdate, idLista }) => {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    return (
        <div>
            <button
                className="flex text-black_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={() => setIsModalOpen(true)}
            >
                <FiEdit />
                Editar
            </button>

            <ModalEditarActividad
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpdate={onUpdate}
                formData={formData}
                setFormData={setFormData}
                activity={activity}
            />
        </div>
    );
};

export default UpdateActivityButton;
