import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 

const Search = ({ datos, propiedad, placeholder }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate(); 

    const manejarCambio = (evento) => {
        setQuery(evento.target.value);
    };

    const manejarBusqueda = () => {
        const resultado = datos.find((item) =>
            item[propiedad].toLowerCase().includes(query.toLowerCase())
        );

        if (resultado) {
            const ruta = `${resultado.idTablero}`;
            navigate(ruta);
        } else {
            alert("No se encontró ninguna coincidencia");
        }
    };

    return (
        <div className="bg-white w-[270px] min-w-[270px] h-[30px] min-h-[30px] mx-auto py-1 px-1 flex items-center border border-black_1 shadow-sm focus:outline-none text-sm">
            <input
                type="text"
                value={query}
                onChange={manejarCambio}
                placeholder={placeholder || "Buscar..."}
                className="w-[250px] h-[30px] p-2 bg-transparent focus:ring-0 focus:border-transparent focus:outline-none"
            />
            <button
                onClick={manejarBusqueda}
                className="flex items-center w-[20px] h-[20px] text-black_1 rounded-md focus:ring-offset-transparent"
            >
                <MdSearch size={25}/>
            </button>
        </div>
    );
};

export default Search;