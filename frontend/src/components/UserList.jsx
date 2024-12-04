import { useState, useEffect } from "react";
import { MdDashboard, MdFolder, MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AddUserSpaceButton from "./AddUserSpaceButton";

const UsersList = ({ title, list = [], idEspacio }) => {
    console.log(list)

    return (
        <div className="flex flex-col items-center justify-between p-1 mt-2 cursor-pointer w-[190px]">
            <div className="flex flex-col bg-black_1 w-full">
                <span className="flex justify-start py-2 px-4 font-medium text-purple_1 text-sm">{title}</span>
            </div>
            <div className="flex flex-col text-sm mt-2 bg-white text-black_1 w-full">
                {list.map((element) => (
                    <UserList key={element.idUsuario} id={element.idUsuario} nombreUsuario={element.nombreUsuario}/>
                ))}
                <AddUserSpaceButton idEspacio={idEspacio}/>
            </div>
        </div>
    );
};

const UserList = ({ id, nombreUsuario }) => {
    return (
        <div className="flex items-center hover:bg-grey_1 text-xs gap-x-1 p-2">
            <MdPerson size={18}/>
            {nombreUsuario}
        </div>
    );
};

export default UsersList;
