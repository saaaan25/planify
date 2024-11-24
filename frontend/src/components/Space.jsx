import UpdateSpaceButton from "./UpdateSpaceButton";
import DeleteSpaceButton from "./DeleteSpaceButton";
import PopoverTemplate from "./Popover";
import { FiEye } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const Space = ({ espacio, onUpdate, onDelete }) => {
    const navigate = useNavigate()

    const color = '/space/' + espacio.espColor.replace('#', '') + '.png';

    const gotoSpace = () => {
        navigate(`/${espacio.idEspacio}`)
    }

    const popover_content = (
        <div className="flex flex-col">
            <UpdateSpaceButton espacio={espacio} onUpdate={onUpdate} />
            <DeleteSpaceButton espacio={espacio} onDelete={onDelete} />
            <button
                className="flex text-black_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={gotoSpace}
            >
                <FiEye/>
                Ver
            </button>
        </div>
    );

    const popover_trigger = (
        <button className="text-black_1 px-4 py-2 rounded-md">
            <div className="flex flex-col items-center justify-center">
                <img src={color} className="w-[100px] mb-3 min-w-[100px]"/>
                <h3 className="font-bold text-sm">{espacio.espTitulo}</h3>
            </div>
        </button>
    );

    return (
        <div className="mb-4 p-4">
            <div className="flex flex-col">
                <PopoverTemplate content={popover_content} trigger={popover_trigger}/>
            </div>
        </div>
    );
};

export default Space;
