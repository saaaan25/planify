import React, { useState } from "react";
import { FiTrash } from 'react-icons/fi';

const DeleteBoardButton = ({ tablero, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:5000/api/tableros/${tablero.idTablero}`, {
                method: "DELETE",
            });
            onDelete(); // Refresca los datos después de eliminar
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al eliminar tablero:", error);
            alert("No se pudo eliminar el tablero. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div>
            <button
                className="flex text-black_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={() => setIsModalOpen(true)} 
            >
                <FiTrash />
                Eliminar
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
                        <h2 className="text-xl font-bold mb-4">Eliminar Tablero</h2>
                        <p>¿Estás seguro de que deseas eliminar este tablero?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={handleDelete}
                            >
                                Sí, eliminar
                            </button>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded-md ml-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteBoardButton;
