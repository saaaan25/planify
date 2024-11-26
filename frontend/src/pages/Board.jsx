import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from '../components/Siderbar';
import List from '../components/List';
import AddListButton from '../components/AddListButton';

const Board = () => {
    const [listas, setListas] = useState([]);
    const { user } = useContext(AuthContext);
    console.log(listas)
    const idTablero = useParams();
    console.log(idTablero.idTablero)

    const fetchListas = async () => {
        const res = await fetch(`http://localhost:5000/api/listas`);
        const data = await res.json();
        setListas(data.filter((lista) => lista.idTablero === idTablero.idTablero));
    };
    console.log(listas, idTablero.idTablero)

    useEffect(() => {
        fetchListas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.idUsuario, idTablero.idTablero]);

    return (
        <div className='flex flex-col w-[100vw] h-[100vh] items-start justify-start'>
            <Header/>
            <div className='flex w-full h-full'>
                <Sidebar>
                    <AddListButton idTablero={idTablero.idTablero} onCreate={fetchListas}/>
                </Sidebar>
                <div className='p-10'>
                    <div className='flex justify-start font-frankfurter text-3xl pl-2 text-black_1'>
                        To do list
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 m-3 gap-4'>
                        {listas.map((lista) => (
                            <List
                            key={lista.idLista}
                            lista={lista}
                            onUpdate={fetchListas}
                            onDelete={fetchListas}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Board;
