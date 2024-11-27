import { useState } from "react";
import { FiTrash } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

const DeleteCommentButton = ({ comentario, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/comentarios/${comentario.idComentario}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error al eliminar comentario");
            }

            onDelete(); // Llama a la función para actualizar la lista de comentarios
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al eliminar comentario:", error);
            alert("No se pudo eliminar el comentario. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div>
            <button
                className="flex text-black_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={() => setIsModalOpen(true)} // Abre el modal para confirmar la eliminación
            >
                <FiTrash />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-grey_1 p-6 rounded-lg shadow-lg w-[450px] min-w-[450px]">
                        <div className="w-full flex justify-between text-black_1 items-start">
                            <h1 className="text-2xl font-frankfurter mb-4">Eliminar Comentario</h1>
                            <button onClick={() => setIsModalOpen(false)}>
                                <MdClose size={20}/>
                            </button>
                        </div>
                        <p>¿Estás seguro de que deseas eliminar este comentario?</p>
                        <div className="flex gap-x-3 justify-center mb-2">
                            <button
                                className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                                onClick={handleDelete} // Ejecuta la eliminación
                            >
                                Aceptar
                            </button>
                            <button
                                className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                                onClick={() => setIsModalOpen(false)} // Cierra el modal sin eliminar
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

export default DeleteCommentButton;