import { useState, useEffect } from "react";

const ProfilePhoto = () => {
    const [user, setUser] = useState(null);

    return (
        <div>
            <img src={user?.imagenUrl} alt="" />
        </div>
    );
}
 
export default ProfilePhoto;