import { MdEdit, MdDelete } from "react-icons/md";
import UpdateCommentButton from "./UpdateCommentButton";
import DeleteCommentButton from "./DeleteCommentButton"; 

const Comment = ({ comment, fetchComments }) => {
    return (
        <div
            className="flex justify-between items-center bg-white p-3 mb-2 rounded-lg shadow-sm hover:bg-gray-50"
            >
            <div>
                <h3 className="text-sm font-bold text-gray-700">{comment.idTablero}</h3>
                <p className="text-sm text-gray-500">{comment.comDescripcion}</p>
            </div>
            <div className="flex gap-2">
                <UpdateCommentButton comentario={comment} onUpdate={fetchComments}/>
                <DeleteCommentButton comentario={comment} onDelete={fetchComments}/>
            </div>
        </div>
    )
};

export default Comment;