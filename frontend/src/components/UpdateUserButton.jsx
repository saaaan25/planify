import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { MdClose } from "react-icons/md";

const UpdateUserButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, updateUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        apellido: user?.apellido || '',
        nombreUsuario: user?.nombreUsuario || '',
        email: user?.email || '',
        contrasena: "",
        imagenUrl: user?.imagenUrl || '',
    });

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/usuarios/${user.idUsuario}`, formData, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                updateUser({
                    ...user,
                    ...formData, 
                });

                handleCloseModal();
                alert("Usuario actualizado correctamente");
            } else {
                alert("Hubo un error al actualizar el usuario");
            }
        } catch (error) {
            console.error("Error al actualizar el usuario", error);
            alert("Hubo un error al actualizar los datos.");
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre,
                apellido: user.apellido,
                nombreUsuario: user.nombreUsuario,
                email: user.email,
                contrasena: "",
                imagenUrl: user.imagenUrl,
            });
        }
    }, [user]);

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <button
                onClick={handleOpenModal}
                className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
            >
                Editar perfil
            </button>
            <UpdateUserModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

const UpdateUserModal = ({ isOpen, onClose, formData, handleChange, handleSubmit }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-grey_1 p-6 rounded-lg shadow-xl w-[450px] min-w-[450px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex justify-between text-black_1 items-start">
                    <h1 className="text-2xl font-frankfurter mb-2">Editar perfil</h1>
                    <button onClick={onClose}>
                        <MdClose size={20}/>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    <div className="flex flex-col gap-y-3 text-xs">
                        <label className="font-bold flex justify-start">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="py-1 px-2 border border-black_1"
                        />
                    </div>
                    <div className="flex flex-col gap-y-3 text-xs">
                        <label className="font-bold flex justify-start">Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="py-1 px-2 border border-black_1"
                        />
                    </div>
                    <div className="flex flex-col gap-y-3 text-xs">
                        <label className="font-bold flex justify-start">Nombre de usuario</label>
                        <input
                            type="text"
                            name="nombreUsuario"
                            value={formData.nombreUsuario}
                            onChange={handleChange}
                            className="py-1 px-2 border border-black_1"
                        />
                    </div>
                    <div className="flex flex-col gap-y-3 text-xs">
                        <label className="font-bold flex justify-start">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="py-1 px-2 border border-black_1"
                        />
                    </div>
                    <div className="flex flex-col gap-y-3 text-xs">
                        <label className="font-bold flex justify-start">Contraseña</label>
                        <input
                            type="password"
                            name="contrasena"
                            value={formData.contrasena}
                            onChange={handleChange}
                            className="py-1 px-2 border border-black_1"
                        />
                    </div>
                    <div className="flex gap-x-3 w-full justify-center">
                        <button
                            type="submit"
                            className="px-4 py-1 rounded-sm mt-4 ml-2 bg-purple_1 text-black_1 border border-black_1"
                        >
                            Aceptar
                        </button>
                        <button onClick={onClose} className="px-4 py-1 rounded-sm mt-4 ml-2 bg-purple_1 text-black_1 border border-black_1">
                            Cancelar
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default UpdateUserButton;
