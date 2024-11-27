import React from 'react';
import Comment from './Comment';
import AddCommentButton from './AddCommentButton';

const CommentsDetailsModal = ({ isOpen, closeModal, comentarios = [], fetchComentarios, idTablero, idUsuario }) => {
    if (!isOpen) return null;
    console.log(comentarios)

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Datos del Modal</h2>
                { comentarios.length === 0
                ? "No hay comentarios"
                : comentarios.map((comentario) => (
                    <Comment key={comentario.idComentario} comment={comentario} fetchComments={fetchComentarios} />
                ))}
                <div>
                    <AddCommentButton onCreate={fetchComentarios} idTablero={idTablero} idUsuario={idUsuario}/>
                    <button 
                        onClick={closeModal} 
                        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                        >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentsDetailsModal;
