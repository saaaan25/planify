import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post("http://localhost:5000/api/register", {
                nombre,
                apellido,
                nombreUsuario,
                email,
                contrasena,
                imagenUrl: "default_profil.jpeg",
            });
            setSuccess(response.data.message);
            console.log(response.data.message);
            navigate('/login');
        } catch (error) {
            setError(error.response ? error.response.data.message : "Error en el servidor");
        }
    };

    return (
        <div className="bg-white rounded-3xl w-1/3 h-fit min-h-[400px] min-w-[400px] p-5 bg-opacity-70 shadow-xl text-sm">
            <form className="w-full h-full flex flex-col items-center justify-center gap-y-7"
                    onSubmit={handleRegister}>
                <div>
                    <img src="planify_logo.png" alt="" />
                </div>
                <div className="flex flex-col justify-center gap-y-5 w-3/4">
                    <div className="w-full">
                        <p className="w-full flex justify-start">Correo electrónico</p>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full px-2 py-1 border-b border-black text-gray-700 focus:outline-none bg-transparent"/>
                    </div>
                    <div className="w-full">
                        <p className="w-full flex justify-start">Usuario</p>
                        <input type="text" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)}
                            className="w-full px-2 py-1 border-b border-black text-gray-700 focus:outline-none bg-transparent"/>
                    </div>
                    <div className="w-full">
                        <p className="w-full flex justify-start">Contraseña</p>
                        <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)}
                            className="w-full px-2 py-1 border-b border-black text-gray-700 focus:outline-none bg-transparent"/>
                    </div>
                    <div className="w-full">
                        <p className="w-full flex justify-start">Nombre</p>
                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
                            className="w-full px-2 py-1 border-b border-black text-gray-700 focus:outline-none bg-transparent"/>
                    </div>
                    <div className="w-full">
                        <p className="w-full flex justify-start">Apellido</p>
                        <input type="text" value={apellido} onChange={e => setApellido(e.target.value)}
                            className="w-full px-2 py-1 border-b border-black text-gray-700 focus:outline-none bg-transparent"/>
                    </div>
                </div>
                <div className="mt-4">
                    <button className="bg-purple_1 rounded-3xl py-2 px-7">
                        Registrarse
                    </button>
                </div>
                {error && <p className="text-sm text-purple_4">Todos los campos son obligatorios</p>}
            </form>
            
        </div>
    );
}
 
export default RegisterForm;