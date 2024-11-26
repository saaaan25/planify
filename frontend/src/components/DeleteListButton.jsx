import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const DeleteListButton = ({ lista, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:5000/api/listas/${lista.idLista}`, {
            method: "DELETE",
        });
            onDelete();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al eliminar la lista:", error);
            alert("Ocurrió un error al intentar eliminar la lista. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div>
            <button
                className="flex text-black_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={() => setIsModalOpen(true)}
            >
                <FiTrash2 />
                Eliminar
            </button>

        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-grey_1 px-10 py-6 rounded-lg shadow-lg w-[450px] min-w-[450px]">
                    <div className="w-full flex justify-between text-black_1 items-start">
                        <h1 className="text-2xl font-frankfurter mb-4">Confirmar Eliminación</h1>
                        <button onClick={() => setIsModalOpen(false)}>
                            <MdClose size={20} />
                        </button>
                    </div>
                    <p className="text-black_1 mb-6">
                        ¿Estás seguro de que deseas eliminar esta lista? Esta acción no se puede deshacer.
                    </p>
                    <div className="flex gap-x-3 justify-center">
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-sm mt-4"
                            onClick={handleDelete}
                        >
                            Aceptar
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 text-black px-4 py-2 rounded-sm mt-4"
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

export default DeleteListButton;