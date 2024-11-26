import { useContext, useState } from "react";
import { MdAddCircle } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { AuthContext } from "../context/AuthContext";

const AddSpaceButton = ({ onCreate }) => {
    const { user } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const act_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const [formData, setFormData] = useState({
        espTitulo: "",
        espColor: "",
        espFechaCreacion: act_date,
        idUsuario: user.idUsuario, 
    });

    const colorOptions = [
        { name: "azul", hex: "#a8b7fd" },
        { name: "celeste", hex: "#bad5eb" },
        { name: "verde", hex: "#a7ff81" },
        { name: "amarillo", hex: "#fff176" },
        { name: "rojo", hex: "#ff9d9d" },
        { name: "rosado", hex: "#fac0d2" },
    ];

    const handleSubmit = async () => {
        try {
            const espacioResponse = await fetch("http://localhost:5000/api/espacios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            if (!espacioResponse.ok) {
                throw new Error("Error al crear el espacio");
            }
    
            const espacioData = await espacioResponse.json();
            const idEspacio = espacioData.idEspacio;
    
            const usuarioEspacioResponse = await fetch("http://localhost:5000/api/usuario_espacio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    idUsuario: formData.idUsuario,
                    idEspacio: idEspacio, 
                }),
            });
    
            if (!usuarioEspacioResponse.ok) {
                throw new Error("Error al crear la relación usuario_espacio");
            }
    
            onCreate();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al agregar espacio y usuario_espacio:", error);
            alert("Ocurrió un error al agregar el espacio y su relación. Por favor, intenta de nuevo.");
        }
    };
    
    return (
        <div>
            <button
                className="bg-purple_1 text-black_1 px-4 py-2 rounded-md flex items-center gap-x-2 hover:bg-purple_2 w-[190px]"
                onClick={() => setIsModalOpen(true)} 
            >
                <MdAddCircle size={20}/>
                <p className="text-sm">Agregar espacio</p>
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-grey_1 px-10 py-6 rounded-lg shadow-lg w-[450px] min-w-[450px]">
                        <div className="w-full flex justify-between text-black_1 items-start">
                            <h1 className="text-2xl font-frankfurter mb-4">Agregar Espacio</h1>
                            <button onClick={() => setIsModalOpen(false)}>
                                <MdClose size={20}/>
                            </button>
                        </div>
                        <form>
                            <label className="block mb-4">
                                <p className="flex justify-start">Título</p>
                                <input
                                type="text"
                                placeholder="Título"
                                className="w-full mt-2 border border-black px-2 py-1"
                                value={formData.espTitulo}
                                onChange={(e) =>
                                    setFormData({ ...formData, espTitulo: e.target.value })
                                }
                                />
                            </label>
                            <label className="block mb-4">
                                <p className="flex justify-start">Color</p>
                                <div className="flex gap-4 mt-2">
                                    {colorOptions.map((color) => (
                                        <div key={color.hex}>
                                            <input
                                                type="radio"
                                                id={color.hex}
                                                name="espColor"
                                                value={color.hex}
                                                checked={formData.espColor === color.hex}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, espColor: e.target.value })
                                                }
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={color.hex}
                                                className={`w-8 h-8 inline-block cursor-pointer border-black ${
                                                    formData.espColor === color.hex
                                                        ? "border-2"
                                                        : "border"
                                                }`}
                                                style={{ backgroundColor: color.hex }}
                                            ></label>
                                        </div>
                                    ))}
                                </div>
                            </label>
                            <div className="flex gap-x-3 justify-center mb-2">
                                <button
                                    type="button"
                                    className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                                    onClick={handleSubmit}
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="bg-purple_1 text-black_1 border border-black_1 px-4 py-1 rounded-sm mt-4 ml-2"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                            </div> 
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddSpaceButton;
