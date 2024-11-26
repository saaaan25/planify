const ActivityDetailsModal = ({ activity, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div className="bg-white p-4 rounded shadow-lg w-[450px] min-w-[450px] z-60 relative">
                <h2 className="text-lg font-bold mb-4">Detalles de la Actividad</h2>
                <p><strong>Título:</strong> {activity.actTitulo}</p>
                <p><strong>Descripción:</strong> {activity.actDescripcion}</p>
                <p><strong>Fecha:</strong> {new Date(activity.actFecha).toLocaleString()}</p>
                <p><strong>Prioridad:</strong> {activity.prioridad}</p>
                <p><strong>Estado:</strong> {activity.estado === 1 ? "Completado" : "Pendiente"}</p>
                <div className="flex justify-end mt-4">
                    <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivityDetailsModal;
