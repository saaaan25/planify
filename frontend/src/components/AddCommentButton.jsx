import { useState } from "react";
import { MdClose } from 'react-icons/md';

const AddCommentButton = ({ onCreate, idTablero, idUsuario }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        comDescripcion: "",
        idUsuario: idUsuario,
        idTablero: idTablero,
    });

    const handleSubmit = async () => {
        console.log(formData);
        
        try {
            const response = await fetch("http://localhost:5000/api/comentarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error al crear comentario");
            }

            onCreate();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al agregar comentario:", error);
            alert("Ocurrió un error al agregar el comentario. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div>
            <button
                className="bg-purple_1 text-black_1 px-4 py-2 rounded-sm border border-black_1 flex items-center gap-x-2"
                onClick={() => setIsModalOpen(true)} 
            >
                <p className="text-sm">Agregar comentario</p>
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-grey_1 px-10 py-6 rounded-lg shadow-lg w-[450px] min-w-[450px]">
                        <div className="w-full flex justify-between text-black_1 items-start">
                            <h1 className="text-2xl font-frankfurter mb-4">Agregar Comentario</h1>
                            <button onClick={() => setIsModalOpen(false)}>
                                <MdClose size={20}/>
                            </button>
                        </div>
                        <form>
                            <label className="block mb-4">
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

export default AddCommentButton;
