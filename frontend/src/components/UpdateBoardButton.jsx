import React, { useState } from "react";
import { FiEdit } from 'react-icons/fi';

const UpdateBoardButton = ({ tablero, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        idTablero: tablero.idTablero,
        tabTitulo: tablero.tabTitulo,
        tabColor: tablero.tabColor,
        idEspacio: tablero.idEspacio,
    });

    const colorOptions = [
        { name: "azul", hex: "#a8b7fd" },
        { name: "celeste", hex: "#bad5eb" },
        { name: "verde", hex: "#a7ff81" },
        { name: "amarillo", hex: "#fff176" },
        { name: "rojo", hex: "#ff9d9d" },
        { name: "rosado", hex: "#fac0d2" },
    ];

    const handleSubmit = async () => {
        try {
            await fetch(`http://localhost:5000/api/tableros/${formData.idTablero}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            onUpdate(); // Refresca los datos después de actualizar
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al actualizar tablero:", error);
            alert("No se pudo actualizar el tablero. Por favor, intenta de nuevo.");
        }
    };

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
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
                        <h2 className="text-xl font-bold mb-4">Actualizar Tablero</h2>
                        <form>
                            <label className="block mb-2">
                                Título:
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                                    value={formData.tabTitulo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, tabTitulo: e.target.value })
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
                                                name="tabColor"
                                                value={color.hex}
                                                checked={formData.tabColor === color.hex}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, tabColor: e.target.value })
                                                }
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={color.hex}
                                                className={`w-8 h-8 inline-block cursor-pointer border-black ${
                                                    formData.tabColor === color.hex
                                                        ? "border-2"
                                                        : "border"
                                                }`}
                                                style={{ backgroundColor: color.hex }}
                                            ></label>
                                        </div>
                                    ))}
                                </div>
                            </label>
                            <label className="block mb-4">
                                ID Espacio:
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                                    value={formData.idEspacio}
                                    onChange={(e) =>
                                        setFormData({ ...formData, idEspacio: e.target.value })
                                    }
                                />
                            </label>
                            <button
                                type="button"
                                className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
                                onClick={handleSubmit}
                            >
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="bg-gray-400 text-white px-4 py-2 rounded-md mt-4 ml-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateBoardButton;
