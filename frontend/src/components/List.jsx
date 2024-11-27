import ProgressBar from "./ProgressBar";
import Activity from "./Activity";
import AddActivityButton from "./AddActivityButton";
import ListOptions from "./ListOptions";
import useFetchActividades from "../hooks/getActividades";
import useProgress from "../hooks/getProgress";

const List = ({ lista, onUpdate, onDelete }) => {
    const { actividades, fetchActividades } = useFetchActividades(lista.idLista);
    const progress = useProgress(actividades);

    return (
        <div className="text-black_1 px-4 py-2 rounded-md">
            <div className="flex items-center justify-center border border-black_1 mb-2 w-[300px] min-w-[300px] h-[60px] min-h-[60px] p-1"
                style={{backgroundColor: lista.lisColor}}>
                <div className="w-[10%]">

                </div>
                <h3 className="w-[80%] text-2xl font-frankfurter py-2 px-4">
                    {lista.lisTitulo}
                </h3>
                <div className="w-[10%] flex items-center justify-center h-[60px]">
                    <ListOptions  lista={lista} onUpdate={onUpdate} onDelete={onDelete}/>
                </div>   
            </div>
            <div className="flex flex-col bg-white bg-opacity-50 items-center justify-center border border-black_1 w-[300px] min-w-[300px]">
                <div className="w-full h-[15px]"
                    style={{backgroundColor: lista.lisColor}}>
                    
                </div>
                <div className="w-full m-2">
                    {actividades.map((actividad) => (
                        <Activity key={actividad.idActividad} activity={actividad} onUpdate={fetchActividades} onDelete={fetchActividades} />
                    ))
                    }
                </div>
                <div className="flex justify-end w-full">
                    <AddActivityButton idLista={lista.idLista} color={lista.lisColor} onCreate={fetchActividades} />
                </div>
                <div className="border-t border-black_1">
                    <ProgressBar color={lista.lisColor} progress={progress}/>
                </div>
            </div>
        </div>
    );
}
 
export default List;