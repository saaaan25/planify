import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import { MdPerson } from "react-icons/md";
import UpdateUserButton from "./UpdateUserButton";

const UserDetailsButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext)
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="flex justify-center items-center text-sm">
            <button
                onClick={handleOpenModal}
                className="flex text-black_1 rounded-lg hover:bg-purple_1 px-3 py-2 justify-start items-center gap-x-2"
                >
                <MdPerson size={20} />
                Ver Perfil
            </button>
            <UserDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} user={user}/>
        </div>
    );
}

const UserDetailsModal = ({ isOpen, onClose, user }) => {
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
                <div>
                    <h2 className="font-frankfurter">Ver perfil</h2>
                </div>
                <div className="grid grid-cols-2">
                    <div className="flex flex-col ml-3 items-start justify-center">
                        <img src={user.imagenUrl} alt="profile" />
                        <div className="mt-3">
                            <p className="font-bold">{user.nombreUsuario}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 text-xs mr-3 w-full">
                        <div className="flex justify-start w-full">
                            <p className="font-bold">Nombre</p>
                            <p className="py-1 px-2 border border-black_1">{user.nombre}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 text-xs mr-3 w-full">
                        <div className="flex justify-start w-full">
                            <p className="font-bold">Apellido</p>
                            <p className="py-1 px-2 border border-black_1">{user.apellido}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 text-xs mr-3 w-full">
                        <div className="flex justify-start w-full">
                            <p className="font-bold">Correo</p>
                            <p className="py-1 px-2 border border-black_1">{user.email}</p>
                        </div>
                    </div>
                    <div>
                        <UpdateUserButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default UserDetailsButton;