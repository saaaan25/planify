import { MdEdit, MdDelete } from "react-icons/md";
import UpdateCommentButton from "./UpdateCommentButton";
import DeleteCommentButton from "./DeleteCommentButton"; 

const Comment = ({ comment, fetchComments }) => {
    return (
        <div
            className="flex justify-between items-center bg-grey_1 p-3 mb-2 rounded-3xl hover:bg-white"
            >
            <div className="pl-4">
                <h3 className="text-sm font-bold text-black_1 flex justify-start">{comment.idTablero}</h3>
                <p className="text-sm text-black_1 flex justify-start">{comment.comDescripcion}</p>
            </div>
            <div className="flex gap-2">
                <UpdateCommentButton comentario={comment} onUpdate={fetchComments}/>
                <DeleteCommentButton comentario={comment} onDelete={fetchComments}/>
            </div>
        </div>
    )
};

export default Comment;