import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import { MdPerson, MdClose } from "react-icons/md";
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
                className="bg-grey_1 py-6 px-10 rounded-lg shadow-xl w-[450px] min-w-[450px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex justify-between text-black_1 items-start">
                    <h1 className="text-2xl font-frankfurter mb-4">Ver perfil</h1>
                    <button onClick={onClose}>
                        <MdClose size={20}/>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-x-5">
                    <div className="flex flex-col items-start justify-center">
                        <div className="rounded-full w-[150px] h-[150px] ml-2">
                            <img src={user.imagenUrl} alt="profile" className="rounded-full w-[150px] h-[150px]"/>
                        </div>
                        <div className="mt-3 flex justify-center w-full">
                            <p className="font-bold">{user.nombreUsuario}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start w-full">
                        <div className="flex flex-col gap-y-2 text-xs mr-3 w-full justify-start mb-3">
                            <p className="font-bold flex justify-start">Nombre</p>
                            <p className="py-1 px-2 border border-black_1 flex justify-start bg-white w-full">{user.nombre}</p>
                        </div>
                        <div className="flex flex-col gap-y-2 text-xs mr-3 w-full mb-3">
                            <p className="font-bold flex justify-start">Apellido</p>
                            <p className="py-1 px-2 border border-black_1 flex justify-start bg-white w-full">{user.apellido}</p> 
                        </div>
                        <div className="flex flex-col gap-y-2 text-xs mr-3 w-full">
                            <p className="font-bold flex justify-start">Correo</p>
                            <p className="py-1 px-2 border border-black_1 flex justify-start bg-white w-full">{user.email}</p>        
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <UpdateUserButton />
                </div>
            </div>
        </div>
    );
}
 
export default UserDetailsButton;