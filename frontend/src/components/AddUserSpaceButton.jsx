import { useState, useEffect } from 'react';
import useFetchUsuarios from '../hooks/getUsuarios';
import { MdClose, MdSearch } from 'react-icons/md';

const AddUserSpaceModal = ({ isOpen, closeModal, idEspacio }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [idUsuario, setIdUsuario] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const { usuarios, fetchUsuarios } = useFetchUsuarios();

    useEffect(() => {
        if (isOpen) {
            fetchUsuarios(); 
        }
    }, [isOpen, fetchUsuarios]);

    const handleSearchUser = () => {
        if (!nombreUsuario) {
            setErrorMessage('Por favor, ingrese el nombre del usuario.');
            return;
        }

        const user = usuarios.find(user => user.nombreUsuario.toLowerCase() === nombreUsuario.toLowerCase());

        if (user) {
            setIdUsuario(user.idUsuario); 
            setErrorMessage('');
        } else {
            setErrorMessage('Usuario no encontrado.');
            setIdUsuario(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idUsuario) {
            setErrorMessage('Primero debes buscar un usuario válido.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/usuario_espacio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idUsuario,
                    idEspacio
                })
            });

            const data = await response.json();
            
            if (data.message) {
                setSuccessMessage(data.message);
                setErrorMessage('');
                setNombreUsuario(''); 
                setIdUsuario(null); 
            } else {
                setErrorMessage('Error al agregar la relación.');
            }

        } catch (error) {
            setErrorMessage('Hubo un error al agregar la relación.');
            setSuccessMessage('');
        }
    };

    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-grey_1 py-6 px-10 rounded-lg w-96">
                <div className="w-full flex justify-between text-black_1 items-start">
                    <h1 className="text-2xl font-frankfurter mb-4">Agregar miembro</h1>
                    <button onClick={closeModal}>
                        <MdClose size={20}/>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="bloq mb-2">
                        <label className="flex text-sm font-medium text-black_1 justify-start">Nombre del Usuario</label>
                        <div className='flex items-center justify-center border border-black_1 my-2 bg-white py-2 pl-2'>
                            <input
                                type="text"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                                className="w-[90%] focus:ring-0 focus:border-transparent focus:outline-none"
                                required
                            /> 
                            <button
                                type="button"
                                onClick={handleSearchUser}
                                className="text-black_1 rounded-md w-[10%] pr-2"
                            >
                                <MdSearch size={20}/>
                            </button>
                        </div>
                    </div>  
                    {idUsuario && (
                        <p className="text-black_1 text-sm mb-2">Usuario encontrado con ID: {idUsuario}</p>
                    )}
                    {errorMessage && <p className="text-black_1 text-sm mt-2">{errorMessage}</p>}
                    {successMessage && <p className="text-black_1 text-sm mt-2">{successMessage}</p>}
                    <div className="mt-1 flex justify-center gap-x-3">
                        <button
                            type="submit"
                            className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                        >
                            Aceptar
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AddUserButton = ({ idEspacio }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button
                onClick={openModal}
                className="bg-grey_1 text-black_1 py-2 px-4 my-2 rounded-full hover:bg-black hover:bg-opacity-10"
            >
                Agregar Usuario
            </button>

            <AddUserSpaceModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                idEspacio={idEspacio}
            />
        </div>
    );
};

export default AddUserButton;
