import ProfilePhoto from "./ProfilePhoto";
import { useContext, useNavigate } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
    const { user, logout } = useContext(AuthContext)
    console.log(user)
    
    return (
        <div className="w-full h-[50px] bg-purple_2 flex items-center justify-end px-5">
            
            <button onClick={logout} className="w-[35px] h-[35px] rounded-full">
                <img src={user.imagenUrl} className="w-[35px] h-[35px] rounded-full">
                </img>
            </button>
        </div>
    );
}
 
export default Header;