import { useState } from "react";
import { MdClose } from "react-icons/md";
import { FiTrash } from 'react-icons/fi';

const DeleteActivityButton = ({ activity, onDelete }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/actividades/${activity.idActividad}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Error al eliminar la actividad");

            onDelete();
            setIsDeleteModalOpen(false); // Cierra el modal de eliminación
        } catch (error) {
            console.error("Error al eliminar actividad:", error);
            alert("Ocurrió un error al eliminar la actividad.");
        }
    };

    return (
        <div>
            <button
                className="flex text-black_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={() => setIsDeleteModalOpen(true)} 
            >
                <FiTrash />
                Eliminar
            </button>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-grey_1 w-[450px] min-w-[450px] rounded-md shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-frankfurter">Eliminar actividad</h2>
                            <button onClick={() => setIsDeleteModalOpen(false)}>
                                <MdClose size={20} />
                            </button>
                        </div>
                        <p>¿Estás seguro de que quieres eliminar esta actividad?</p>
                        <div className="flex gap-x-3 justify-center mb-2">
                            <button
                                className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                                onClick={handleDelete}
                            >
                                Aceptar
                            </button>
                            <button
                                className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                                onClick={() => setIsDeleteModalOpen(false)}
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

export default DeleteActivityButton;
