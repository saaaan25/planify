import { useState, useContext } from "react";
import { MdAddCircle, MdClose } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";

const AddActivityButton = ({ idLista, color, onCreate }) => {
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

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/actividades", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Error al crear la actividad");

            onCreate();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al crear actividad:", error);
            alert("Ocurrió un error al crear la actividad.");
        }
    };

    return (
        <div>
        <button
            className="flex w-full items-end text-white p-2"
            onClick={() => setIsModalOpen(true)}
        >
            <MdAddCircle size={30} color={color}/>
        </button>

        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-grey_1 w-[450px] min-w-[450px] rounded-md shadow-lg py-6 px-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-frankfurter">Crear actividad</h2>
                        <button onClick={() => setIsModalOpen(false)}>
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
                                onClick={() => setIsModalOpen(false)}
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
            </div>
        )}
        </div>
    );
};

export default AddActivityButton;