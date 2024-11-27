import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from '../components/Siderbar';
import List from '../components/List';
import AddListButton from '../components/AddListButton';
import CommentsDetailsModal from '../components/CommentsDetailsModal';
import { MdComment } from 'react-icons/md';
import useFetchListas from '../hooks/getListas';
import useFetchComentarios from '../hooks/getComentarios';
import EstadisticasTableroModal from '../components/BoardStatsModal';

const Board = () => {
    const idTablero = useParams();
    const { listas, fetchListas } = useFetchListas(idTablero.idTablero)
    const { comentarios, fetchComentarios } = useFetchComentarios(idTablero.idTablero)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className='flex flex-col w-[100vw] h-[100vh] items-start justify-start'>
            <Header/>
            <div className='flex w-full h-full'>
                <Sidebar>
                    <AddListButton idTablero={idTablero.idTablero} onCreate={fetchListas}/>
                    <button
                        className="bg-purple_1 text-black_1 px-4 py-2 rounded-md flex items-center gap-x-2 hover:bg-purple_2"
                        onClick={openModal} 
                    >
                        <MdComment size={20}/>
                        <p className="text-sm">Comentarios</p>
                    </button>
                    <button onClick={() => setIsStatsModalOpen(true)}>
                        Estadísticas
                    </button>
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
            <CommentsDetailsModal 
                isOpen={isModalOpen} 
                closeModal={closeModal} 
                comentarios={comentarios} 
                fetchComentarios={fetchComentarios}
                idTablero={idTablero.idTablero}
                idUsuario={user.idUsuario}
            />
            <EstadisticasTableroModal
                        id={idTablero.idTablero} 
                        context="tablero"
                        isOpen={isStatsModalOpen} 
                        closeModal={() => setIsStatsModalOpen(false)} 
                    />
        </div>
    );
}

export default Board;
