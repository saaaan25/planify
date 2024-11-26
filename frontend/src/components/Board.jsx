import PopoverTemplate from "./Popover";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import UpdateBoardButton from "./UpdateBoardButton";
import DeleteBoardButton from "./DeleteBoardButton";
import ProgressBar from "./ProgressBar";

const Board = ({ tablero, onUpdate, onDelete }) => {
    const navigate = useNavigate();
    const progress = 30;

    const gotoBoard = () => {
        navigate(`/${tablero.idEspacio}/${tablero.idTablero}`);
    };

    const popover_content = (
        <div className="flex flex-col">
            <UpdateBoardButton tablero={tablero} onUpdate={onUpdate} />
            <DeleteBoardButton tablero={tablero} onDelete={onDelete} />
            <button
                className="flex text-black_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={gotoBoard}
            >
                <FiEye />
                Ver
            </button>
        </div>
    );

    const popover_trigger = (
        <button className="text-black_1 px-4 py-2 rounded-md">
            <div className="flex flex-col items-center justify-center border border-black_1 w-[300px] min-w-[300px]">
                <div className="w-full border-b border-black_1">
                    <h3 className="text-2xl font-frankfurter py-2 px-4" 
                        style={{backgroundColor: tablero.tabColor}}>{tablero.tabTitulo}</h3>
                </div>
                <div>
                    <ProgressBar color={tablero.tabColor} progress={progress}/>
                </div>
            </div>
        </button>
    );

    return (
        <div className="mb-4 p-4">
            <div className="flex flex-col">
                <PopoverTemplate content={popover_content} trigger={popover_trigger} />
            </div>
        </div>
    );
};

export default Board;