import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UserDetailsButton from "./UserDetailsButton";
import { MdLogout } from "react-icons/md";

const Header = () => {
    const { user, logout } = useContext(AuthContext)
    console.log(user)

    return (
        <div className="w-full min-h-[50px] h-[50px] bg-purple_2 flex items-center justify-end px-5">
            <UserDetailsButton />
            <button
                className="flex text-black_1 rounded-lg text-sm hover:bg-purple_1 px-3 py-2 justify-start items-center gap-x-2"
                onClick={logout}
            >
                <MdLogout size={20} />
                Cerrar sesión
            </button>
        </div>
    );
}
 
export default Header;