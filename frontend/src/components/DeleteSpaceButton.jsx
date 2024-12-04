import { useState } from "react";
import { createPortal } from "react-dom";
import { FiTrash } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

const ModalEliminar = ({ isOpen, onClose, onDelete, espacio }) => {
    if (!isOpen) return null;

    const handleDelete = async () => {
        await fetch(`http://localhost:5000/api/espacios/${espacio.idEspacio}`, {
            method: "DELETE",
        });
        onDelete(); 
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-grey_1 px-10 py-6 rounded-lg shadow-lg w-[450px] min-w-[450px]">
                <div className="w-full flex justify-between text-black_1 items-start">
                    <h1 className="text-2xl font-frankfurter mb-4">Eliminar espacio</h1>
                    <button onClick={onClose}>
                        <MdClose size={20}/>
                    </button>
                </div> 
                <p>¿Estás seguro de que deseas eliminar este espacio?</p>
                <div className="flex gap-x-3 justify-center mb-2">
                    <button
                        className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                        onClick={handleDelete}
                    >
                        Aceptar
                    </button>
                    <button
                        className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>,
        document.body 
    );
};

const DeleteSpaceButton = ({ espacio, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <button
                className="flex text-black_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={() => setIsModalOpen(true)} 
            >
                <FiTrash />
                Eliminar
            </button>

            <ModalEliminar 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} 
                onDelete={onDelete}
                espacio={espacio}
            />
        </div>
    );
};

export default DeleteSpaceButton;