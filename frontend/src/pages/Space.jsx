import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from '../components/Siderbar';
import Board from '../components/Board';
import AddBoardButton from '../components/AddBoardButton';

const Space = () => {
    const [tableros, setTableros] = useState([]);
    const { user } = useContext(AuthContext);
    const idEspacio = useParams();
    console.log(idEspacio.idEspacio)

    const fetchTableros = async () => {
        const res = await fetch(`http://localhost:5000/api/tableros`);
        const data = await res.json();
        setTableros(data.filter((tablero) => tablero.idEspacio === idEspacio.idEspacio));
    };
    console.log(tableros)

    useEffect(() => {
        fetchTableros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.idUsuario]);

    return (
        <div className='flex flex-col w-[100vw] h-[100vh] items-start justify-start'>
            <Header/>
            <div className='flex w-full h-full'>
                <Sidebar>
                    <AddBoardButton idEspacio={idEspacio.idEspacio} onCreate={fetchTableros}/>
                </Sidebar>
                <div className='p-10'>
                    <div className='flex justify-start font-frankfurter text-3xl pl-2 text-black_1'>
                        Tableros
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
                        {tableros.map((tablero) => (
                            <Board
                            key={tablero.idTablero}
                            tablero={tablero}
                            onUpdate={fetchTableros}
                            onDelete={fetchTableros}
                            />
                        ))}
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
}

export default Space;
