import Header from '../components/Header';
import Space from '../components/Space';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from '../components/Siderbar';
import AddSpaceButton from '../components/AddSpaceButton';
import useFetchEspacios from '../hooks/getEspacios';
import Search from '../components/Search';
import SortOptions from '../components/SortOptions';

const Home = () => {
    const { user } = useContext(AuthContext);
    const { espacios, fetchEspacios } = useFetchEspacios(user.idUsuario);
    const [espaciosFiltrados, setEspaciosFiltrados] = useState(espacios);
    useEffect(() => {
        setEspaciosFiltrados(espacios);
    }, [espacios]);

    return (
        <div className='flex flex-col w-[100vw] h-[100vh] items-start justify-start'>
            <Header/>
            <div className='flex w-full h-full'>
                <Sidebar>
                    <AddSpaceButton onCreate={fetchEspacios}/>
                </Sidebar>
                <div className='p-10'>
                    <div className='h-[50px] w-full flex justify-between items-center'>
                        <div className='flex justify-start font-frankfurter text-3xl pl-2 text-black_1'>
                            Espacios de trabajo
                        </div>
                        <div>
                            <Search datos={espacios} propiedad="espTitulo" placeholder="Buscar espacio"/>
                        </div>
                    </div>
                    <div className='flex my-2 mx-3 gap-x-2 items-center'>
                        <p className='text-sm'>Ordenar por</p>
                        <SortOptions lista={espacios} setEspaciosFiltrados={setEspaciosFiltrados} tipo="espacio" />
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3'>
                        {espaciosFiltrados.map((espacio) => (
                            <Space
                            key={espacio.idEspacio}
                            espacio={espacio}
                            onUpdate={fetchEspacios}
                            onDelete={fetchEspacios}
                            />
                        ))}
                    </div>
                </div>
            </div>        
        </div>
    );
}

export default Home;
