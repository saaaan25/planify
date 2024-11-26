import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const UpdateListButton = ({ lista, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        idLista: lista.idLista,
        lisTitulo: lista.lisTitulo,
        lisColor: lista.lisColor,
        idTablero: lista.idTablero,
    });

    const handleSubmit = async () => {
        try {
            await fetch(`http://localhost:5000/api/listas/${formData.idLista}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
            onUpdate();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al actualizar la lista:", error);
            alert("Ocurrió un error al intentar actualizar la lista. Por favor, intenta de nuevo.");
        }
    };

    const colorOptions = [
        { name: "azul", hex: "#a8b7fd" },
        { name: "celeste", hex: "#bad5eb" },
        { name: "verde", hex: "#a7ff81" },
        { name: "amarillo", hex: "#fff176" },
        { name: "rojo", hex: "#ff9d9d" },
        { name: "rosado", hex: "#fac0d2" },
    ];

    return (
        <div>
            <button
                className="flex text-black_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={() => setIsModalOpen(true)}
            >
                <FiEdit />
                Editar
            </button>

        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-grey_1 px-10 py-6 rounded-lg shadow-lg w-[450px] min-w-[450px]">
                    <div className="w-full flex justify-between text-black_1 items-start">
                        <h1 className="text-2xl font-frankfurter mb-4">Editar Lista</h1>
                        <button onClick={() => setIsModalOpen(false)}>
                            <MdClose size={20} />
                        </button>
                    </div>
                    <form>
                        <label className="block mb-2">
                            <p className="flex justify-start">Título</p>
                            <input
                            type="text"
                            className="w-full mt-2 border border-black px-2 py-1"
                            value={formData.lisTitulo}
                            onChange={(e) =>
                                setFormData({ ...formData, lisTitulo: e.target.value })
                            }
                            />
                        </label>
                        <label className="block mb-4">
                            <p className="flex justify-start">Color</p>
                            <div className="flex gap-4 mt-2">
                            {colorOptions.map((color) => (
                                <div key={color.hex}>
                                    <input
                                        type="radio"
                                        id={color.hex}
                                        name="listColor"
                                        value={color.hex}
                                        checked={formData.lisColor === color.hex}
                                        onChange={(e) =>
                                        setFormData({ ...formData, lisColor: e.target.value })
                                        }
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor={color.hex}
                                        className={`w-8 h-8 inline-block cursor-pointer border-black ${
                                            formData.lisColor === color.hex
                                                ? "border-2"
                                                : "border"
                                        }`}
                                        style={{ backgroundColor: color.hex }}
                                    ></label>
                                </div>
                            ))}
                            </div>
                        </label>
                        <div className="flex gap-x-3 justify-center mb-2">
                            <button
                                type="button"
                                className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                                onClick={handleSubmit}
                                >
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                                onClick={() => setIsModalOpen(false)}
                                >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </div>
    );
};

export default UpdateListButton;