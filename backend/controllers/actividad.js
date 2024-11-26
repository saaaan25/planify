const db = require('../db');

// READ
exports.getAllActividades = (req, res) => {
    const query = 'SELECT * FROM actividad';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener actividades:', err);
            return res.status(500).json({ message: 'Error al obtener actividades' });
        }
        res.json(results);
    });
};

// GET BY ID
exports.getActividadById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM actividad WHERE idActividad = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener actividad:', err);
            return res.status(500).json({ message: 'Error al obtener actividad' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }
        res.json(results[0]);
    });
};

// CREATE
exports.createActividad = (req, res) => {
    const { actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario } = req.body;

    const queryLastId = 'SELECT idActividad FROM actividad ORDER BY idActividad DESC LIMIT 1';

    db.query(queryLastId, (err, results) => {
        if (err) {
            console.error('Error al obtener el último idActividad:', err);
            return res.status(500).json({ message: 'Error al generar el ID de la actividad' });
        }

        let newIdActividad;

        if (results.length === 0) {
            newIdActividad = 'A000000001';
        } else {
            const lastId = results[0].idActividad;
            const numericPart = parseInt(lastId.substring(1));
            const nextNumericPart = numericPart + 1;
            newIdActividad = `A${nextNumericPart.toString().padStart(9, '0')}`; 
        }

        const queryInsert = 'INSERT INTO actividad (idActividad, actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(queryInsert, [newIdActividad, actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario], (err, result) => {
            if (err) {
                console.error('Error al insertar actividad:', err);
                return res.status(500).json({ message: 'Error al insertar actividad' });
            }

            res.status(201).json({ message: 'Actividad creada correctamente', id: newIdActividad });
        });
    });
};

// UPDATE
exports.updateActividad = (req, res) => {
    const { id } = req.params;
    const { actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario } = req.body;
    const query = 'UPDATE actividad SET actTitulo = ?, actDescripcion = ?, actFecha = ?, prioridad = ?, estado = ?, idLista = ?, idUsuario = ? WHERE idActividad = ?';
    db.query(query, [actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar actividad:', err);
            return res.status(500).json({ message: 'Error al actualizar actividad' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }
        res.json({ message: 'Actividad actualizada correctamente' });
    });
};

// UPDATE STATUS
exports.updateEstadoActividad = (req, res) => {
    const { id } = req.params; // Obtén el idActividad de los parámetros
    const { estado } = req.body; // Obtén el nuevo estado del cuerpo de la solicitud

    // Verifica que el estado se envíe en la solicitud
    if (estado === undefined) {
        return res.status(400).json({ message: 'El campo "estado" es obligatorio' });
    }

    const query = 'UPDATE actividad SET estado = ? WHERE idActividad = ?';

    db.query(query, [estado, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el estado de la actividad:', err);
            return res.status(500).json({ message: 'Error al actualizar el estado' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        res.json({ message: 'Estado de la actividad actualizado correctamente' });
    });
};

// DELETE
exports.deleteActividad = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM actividad WHERE idActividad = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar actividad:', err);
            return res.status(500).json({ message: 'Error al eliminar actividad' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }
        res.json({ message: 'Actividad eliminada correctamente' });
    });
};
