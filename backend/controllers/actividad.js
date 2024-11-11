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
    const { idActividad, actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario } = req.body;
    const query = 'INSERT INTO actividad (idActividad, actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [idActividad, actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario], (err, result) => {
        if (err) {
            console.error('Error al insertar actividad:', err);
            return res.status(500).json({ message: 'Error al insertar actividad' });
        }
        res.status(201).json({ message: 'Actividad creada correctamente', id: result.insertId });
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
