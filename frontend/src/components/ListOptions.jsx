import PopoverTemplate from "./Popover";
import UpdateListButton from "./UpdateListButton";
import DeleteListButton from "./DeleteListButton";
import { MdMoreVert } from "react-icons/md";

const ListOptions = ({ lista, onUpdate, onDelete }) => {
    const progress = 30;

    const popover_content = (
        <div className="flex flex-col">
            <UpdateListButton lista={lista} onUpdate={onUpdate} />
            <DeleteListButton lista={lista} onDelete={onDelete} />
        </div>
    );

    const popover_trigger = (
        <div className="flex h-full items-center justify-center">
            <button className="flex items-center justify-center text-black_1 rounded-full hover:bg-gray-400">
                <MdMoreVert size={25}/>
            </button> 
        </div>
    );

    return (
        <div className="p-4">
            <div className="flex flex-col">
                <PopoverTemplate content={popover_content} trigger={popover_trigger} />
            </div>
        </div>
    );
};

export default ListOptions;