import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState(false);

    const { login, isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate();

    if (isAuthenticated) {
        navigate('/');
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()

        if (email == "" || contrasena == "") {
            setError(true)
            console.log('Todos los campos son obligatorios')
            return
        }

        setError(false)
        
        const success = await login(email, contrasena);

        if (!success) {
            setError(true);
            console.log("Credenciales incorrectas");
        } else {
            navigate('/');
            console.log(email, contrasena)
        }
    }

    return (
        <div className="bg-white rounded-3xl w-1/3 h-3/4 min-h-[400px] min-w-[400px] p-5 bg-opacity-70 shadow-xl text-sm">
            <form className="w-full h-full flex flex-col items-center justify-center gap-y-7"
                    onSubmit={handleSubmit}>
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
                        <p className="w-full flex justify-start">Contraseña</p>
                        <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)}
                            className="w-full px-2 py-1 border-b border-black text-gray-700 focus:outline-none bg-transparent"/>
                    </div>
                </div>
                <div className="mt-4">
                    <button className="bg-purple_1 rounded-3xl py-2 px-7">
                        Iniciar Sesión
                    </button>
                </div>
                {error && <p className="text-sm text-purple_4">Todos los campos son obligatorios</p>}
            </form>
            
        </div>
    );
}
 
export default LoginForm;