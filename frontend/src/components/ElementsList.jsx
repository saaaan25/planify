import { useState, useEffect } from "react";
import { MdDashboard, MdFolder } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ElementsList = ({ title, list }) => {
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        if (title === "Otros espacios") {
            const espaciosFiltrados = list.map(element => ({
                id: element.idEspacio,
                name: element.espTitulo
            }));
            setFilteredList(espaciosFiltrados);
        } else if (title === "Otros tableros") {
            const tablerosFiltrados = list.map(element => ({
                id: element.idTablero,
                name: element.tabTitulo
            }));
            setFilteredList(tablerosFiltrados);
        }
    }, [title, list]); 

    return (
        <div className="flex flex-col items-center justify-between p-1 mt-2 cursor-pointer w-[190px]">
            <div className="flex flex-col bg-black_1 w-full">
                <span className="flex justify-start py-2 px-4 font-medium text-purple_1 text-sm">{title}</span>
            </div>
            <div className="flex flex-col text-sm mt-2 bg-white w-full">
                {filteredList.map((element) => (
                    <ElementList key={element.id} id={element.id} name={element.name} title={title} />
                ))}
            </div>
        </div>
    );
};

const ElementList = ({ id, name, title }) => {
    const navigate = useNavigate();
    
    const gotoPage = () => {
        if (title === "Otros espacios") {
            navigate(`/${id}`);
        } else if (title === "Otros tableros") {
            navigate(`${id}`);
        }
    };

    return (
        <div className="flex items-center hover:bg-grey_1 text-xs gap-x-1 p-2" onClick={gotoPage}>
            { title === "Otros espacios" 
                ? <MdFolder size={18}/>
                : <MdDashboard size={18}/>}
            {name}
        </div>
    );
};

export default ElementsList;
