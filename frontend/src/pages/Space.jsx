import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Siderbar';
import Board from '../components/Board';
import AddBoardButton from '../components/AddBoardButton';
import useFetchTableros from '../hooks/getTableros';
import Search from '../components/Search';
import SortOptions from '../components/SortOptions';
import { useState, useEffect, useContext } from 'react';
import ElementsList from '../components/ElementsList';
import { AuthContext } from '../context/AuthContext';
import useFetchEspacios from '../hooks/getEspacios';
import UsersList from '../components/UserList';
import useUsuariosPorEspacio from '../hooks/getUsersBySpace';

const Space = () => {
    const idEspacio = useParams();
    console.log(idEspacio.idEspacio);
    const {tableros, fetchTableros} = useFetchTableros(idEspacio.idEspacio);
    const [tablerosFiltrados, setTablerosFiltrados] = useState(tableros);
    const { user } = useContext(AuthContext);
    const { espacios } = useFetchEspacios(user.idUsuario);
    const espaciosFiltrados = espacios.filter(espacio => espacio.idEspacio !== idEspacio.idEspacio);
    const { usuariosFiltrados } = useUsuariosPorEspacio(idEspacio.idEspacio);
    const { usuariosUnicos } = usuariosFiltrados.filter(usuario => usuario.idUsuario !== user.idUsuario);
    console.log(usuariosFiltrados);
    console.log(usuariosUnicos)
    useEffect(() => {
        setTablerosFiltrados(tableros);
    }, [tableros]);

    return (
        <div className='flex flex-col w-[100vw] h-[100vh] items-start justify-start'>
            <Header/>
            <div className='flex w-full h-full'>
                <Sidebar>
                    <AddBoardButton idEspacio={idEspacio.idEspacio} onCreate={fetchTableros}/>
                    <UsersList idEspacio={idEspacio.idEspacio} title="Miembros" list={usuariosFiltrados} />
                    <ElementsList title="Otros espacios" list={espaciosFiltrados} />
                </Sidebar>
                <div className='p-10'>
                    <div className='h-[50px] w-full flex justify-between items-center'>
                        <div className='flex justify-start font-frankfurter text-3xl pl-2 text-black_1'>
                            Tableros
                        </div>
                        <div>
                            <Search datos={tableros} propiedad="tabTitulo" placeholder="Buscar tablero"/>
                        </div>
                    </div>
                    <div className='flex my-2 mx-3 gap-x-2 items-center'>
                        <p className='text-sm'>Ordenar por</p>
                        <SortOptions lista={tableros} setFiltrados={setTablerosFiltrados} tipo="tablero" />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
                        {tablerosFiltrados.map((tablero) => (
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
