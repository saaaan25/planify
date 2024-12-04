import { useState } from "react";
import { FiEdit } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

const UpdateCommentButton = ({ comentario, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        idComentario: comentario.idComentario,
        comDescripcion: comentario.comDescripcion,
        idUsuario: comentario.idUsuario,
        idTablero: comentario.idTablero,
    });

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/comentarios/${formData.idComentario}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar comentario");
            }

            onUpdate();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al actualizar comentario:", error);
            alert("No se pudo actualizar el comentario. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div>
            <button
                className="flex rounded-full hover:bg-black_1 px-3 py-2 justify-start items-center gap-x-2 
                    hover:text-grey_1 w-[40px] h-[40px] text-black_1"
                onClick={() => setIsModalOpen(true)}
            >
                <FiEdit />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-grey_1 p-6 rounded-lg shadow-lg w-[450px] min-w-[450px]">
                        <div className="w-full flex justify-between text-black_1 items-start">
                            <h1 className="text-2xl font-frankfurter mb-4">Editar Comentario</h1>
                            <button onClick={() => setIsModalOpen(false)}>
                                <MdClose size={20}/>
                            </button>
                        </div>
                        <form>
                            <label className="block mb-2">
                                <p className="flex justify-start">Descripción</p>
                                <textarea
                                    placeholder="Descripción"
                                    className="w-full mt-2 border border-black px-2 py-1"
                                    value={formData.comDescripcion}
                                    onChange={(e) =>
                                        setFormData({ ...formData, comDescripcion: e.target.value })
                                    }
                                />
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

export default UpdateCommentButton;
