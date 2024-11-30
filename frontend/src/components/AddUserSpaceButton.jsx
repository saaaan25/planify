import { useState, useEffect } from 'react';
import useFetchUsuarios from '../hooks/getUsuarios'; // Asegúrate de importar el hook

// Modal para agregar la relación usuario-espacio
const AddUserSpaceModal = ({ isOpen, closeModal, idEspacio }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [idUsuario, setIdUsuario] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    // Usamos el hook para obtener los usuarios
    const { usuarios, fetchUsuarios } = useFetchUsuarios();

    // Fetch usuarios cuando el modal se abre
    useEffect(() => {
        if (isOpen) {
            fetchUsuarios(); // Obtenemos la lista de usuarios cuando el modal se abre
        }
    }, [isOpen, fetchUsuarios]);

    const handleSearchUser = () => {
        if (!nombreUsuario) {
            setErrorMessage('Por favor, ingrese el nombre del usuario.');
            return;
        }

        // Buscar al usuario en la lista de usuarios
        const user = usuarios.find(user => user.nombreUsuario.toLowerCase() === nombreUsuario.toLowerCase());

        if (user) {
            setIdUsuario(user.idUsuario); // Si encontramos el usuario, guardamos su ID
            setErrorMessage('');
        } else {
            setErrorMessage('Usuario no encontrado.');
            setIdUsuario(null); // Si no se encuentra, aseguramos que el ID sea null
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idUsuario) {
            setErrorMessage('Primero debes buscar un usuario válido.');
            return;
        }

        try {
            // Hacer la solicitud al backend para crear la relación
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
                setNombreUsuario(''); // Limpiar el formulario
                setIdUsuario(null); // Limpiar el ID del usuario
            } else {
                setErrorMessage('Error al agregar la relación.');
            }

        } catch (error) {
            setErrorMessage('Hubo un error al agregar la relación.');
            setSuccessMessage('');
        }
    };

    if (!isOpen) return null; // Si el modal no está abierto, no renderizarlo

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-semibold mb-4 text-center">Agregar Usuario a Espacio</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nombre del Usuario</label>
                        <input
                            type="text"
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSearchUser}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full mb-4"
                    >
                        Buscar Usuario
                    </button>
                    {idUsuario && (
                        <p className="text-green-500 text-sm mb-4">Usuario encontrado con ID: {idUsuario}</p>
                    )}
                    {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
                    <div className="mt-4 flex justify-between">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                        >
                            Agregar
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                        >
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Componente principal con el botón para abrir el modal
const AddUserButton = ({ idEspacio }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Botón para abrir el modal */}
            <button
                onClick={openModal}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
                Agregar Usuario
            </button>

            {/* Modal de agregar usuario al espacio */}
            <AddUserSpaceModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                idEspacio={idEspacio}
            />
        </div>
    );
};

export default AddUserButton;
