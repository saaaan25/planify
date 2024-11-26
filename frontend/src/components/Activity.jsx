import { act, useState } from "react";
import DeleteActivityButton from "./DeleteActivityButton";
import PopoverTemplate from "./Popover";
import UpdateActivityButton from "./UpdateActivityButton";
import { FiEye } from "react-icons/fi";
import { MdCheck, MdMoreVert } from "react-icons/md";
import ActivityDetailsModal from "./ActivityDetailsModal"; 

const Activity = ({activity, onUpdate, onDelete}) => {
    const fecha = new Date(activity.actFecha);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStatusChange = async () => {
        const newState = activity.estado === 1 ? 0 : 1;
    
        const formatToTimestamp = (fechaISO) => {
            const fecha = new Date(fechaISO);
            const yyyy = fecha.getFullYear();
            const mm = String(fecha.getMonth() + 1).padStart(2, '0');
            const dd = String(fecha.getDate()).padStart(2, '0'); 
            const hh = String(fecha.getHours()).padStart(2, '0'); 
            const mi = String(fecha.getMinutes()).padStart(2, '0');
            const ss = String(fecha.getSeconds()).padStart(2, '0'); 
    
            return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
        };
    
        const fecha = formatToTimestamp(activity.actFecha); 
    
        const updatedActivity = { ...activity, estado: newState, actFecha: fecha };
    
        try {
            const response = await fetch(`http://localhost:5000/api/actividades/${activity.idActividad}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedActivity),
            });
    
            if (!response.ok) throw new Error("Error al actualizar el estado");
    
            onUpdate(); // Actualiza la lista de actividades
        } catch (error) {
            console.error("Error al actualizar el estado de la actividad:", error);
        }
    };
    
    const handleView = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const popover_content = (
        <div className="flex flex-col">
            <UpdateActivityButton activity={activity} onUpdate={onUpdate} idLista={activity.idLista}/>
            <DeleteActivityButton activity={activity} onDelete={onDelete} />
            <button
                className="flex text-black_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={handleView}
            >
                <FiEye/>
                Ver
            </button>
        </div>
    );

    const popover_trigger = (
        <button className="text-black_1 rounded-md">
            <div className="w-[20px] min-w-[20px] h-[20px] hover:bg-slate-500 rounded-full flex items-center justify-center">
                <MdMoreVert/>
            </div>
        </button>
    );

    return (
        <div className="flex my-1 py-2 mx-2 px-2 gap-x-2 hover:bg-grey_1 rounded-lg items-center">
            <button className="flex w-[20px] min-w-[20px] h-[20px] border border-black_1 items-center justify-center"
                onClick={handleStatusChange}>
                {activity.estado 
                ? <MdCheck />
                : ""}
            </button>
            <div className="text-xs text-gray-600">
                {dia}/{mes}
            </div>
            <div className={`text-sm flex justify-start w-full ${
                    activity.prioridad === "Alta"
                        ? "font-bold"
                        : ""
                    }
                    ${
                        activity.estado === 1
                            ? "line-through"
                            : ""
                        }`}>
                {activity.actTitulo}
            </div>
            <div className="flex justify-center items-center">
                <PopoverTemplate trigger={popover_trigger} content={popover_content} />
            </div>
            {/* Modal para mostrar detalles */}
            <ActivityDetailsModal 
                activity={activity} 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
            />
        </div>
    );
}
 
export default Activity;