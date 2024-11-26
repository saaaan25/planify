import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Space from '../components/Space';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from '../components/Siderbar';
import AddSpaceButton from '../components/AddSpaceButton';

const Home = () => {
    const [espacios, setEspacios] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchEspacios = async () => {
        const res = await fetch(`http://localhost:5000/api/espacios`);
        const data = await res.json();
        setEspacios(data.filter((espacio) => espacio.idUsuario === user.idUsuario));
    };
    console.log(espacios)

    useEffect(() => {
        fetchEspacios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.idUsuario]);

    return (
        <div className='flex flex-col w-[100vw] h-[100vh] items-start justify-start'>
            <Header/>
            <div className='flex w-full h-full'>
                <Sidebar>
                    <AddSpaceButton onCreate={fetchEspacios}/>
                </Sidebar>
                <div className='p-10'>
                    <div className='flex justify-start font-frankfurter text-3xl pl-2 text-black_1'>
                        Espacios de trabajo
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3'>
                        {espacios.map((espacio) => (
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
