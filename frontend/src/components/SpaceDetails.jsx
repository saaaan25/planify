import React from "react";

const SpaceDetails = ({ espacio, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Detalles del Espacio</h2>
                <div className="mb-2">
                    <strong>Título:</strong> {espacio.espTitulo}
                </div>
                <div className="mb-2">
                    <strong>Color:</strong> {espacio.espColor}
                </div>
                <div className="mb-2">
                    <strong>Fecha de Creación:</strong> {espacio.espFechaCreacion}
                </div>
                <div className="mb-2">
                    <strong>Usuario ID:</strong> {espacio.idUsuario}
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded-md"
                        onClick={onClose} // Cierra el modal
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpaceDetails;
