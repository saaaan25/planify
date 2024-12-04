import Comment from './Comment';
import AddCommentButton from './AddCommentButton';
import { MdClose } from 'react-icons/md';

const CommentsDetailsModal = ({ isOpen, closeModal, comentarios = [], fetchComentarios, idTablero, idUsuario }) => {
    if (!isOpen) return null;
    console.log(comentarios)

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-grey_1 p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-frankfurter text-black_1">Ver comentarios</h2>
                    <button onClick={closeModal}>
                        <MdClose size={20} />
                    </button>
                </div>
                { comentarios.length === 0
                ? "No hay comentarios"
                : comentarios.map((comentario) => (
                    <Comment key={comentario.idComentario} comment={comentario} fetchComments={fetchComentarios} />
                ))}
                <div className='mb-2 mt-4 w-full flex justify-center'>
                    <AddCommentButton onCreate={fetchComentarios} idTablero={idTablero} idUsuario={idUsuario}/>
                </div>
            </div>
        </div>
    );
};

export default CommentsDetailsModal;
