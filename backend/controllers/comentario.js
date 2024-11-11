const db = require('../db');

// READ
exports.getAllComentarios = (req, res) => {
    const query = 'SELECT * FROM comentario';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener comentarios:', err);
            return res.status(500).json({ message: 'Error al obtener comentarios' });
        }
        res.json(results);
    });
};

// GET BY ID
exports.getComentarioById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM comentario WHERE idComentario = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener comentario:', err);
            return res.status(500).json({ message: 'Error al obtener comentario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.json(results[0]);
    });
};

// CREATE
exports.createComentario = (req, res) => {
    const { idComentario, comDescripcion, idUsuario } = req.body;
    const query = 'INSERT INTO comentario (idComentario, comDescripcion, idUsuario) VALUES (?, ?, ?)';
    db.query(query, [idComentario, comDescripcion, idUsuario], (err, result) => {
        if (err) {
            console.error('Error al insertar comentario:', err);
            return res.status(500).json({ message: 'Error al insertar comentario' });
        }
        res.status(201).json({ message: 'Comentario creado correctamente', id: result.insertId });
    });
};

// UPDATE
exports.updateComentario = (req, res) => {
    const { id } = req.params;
    const { comDescripcion, idUsuario } = req.body;
    const query = 'UPDATE comentario SET comDescripcion = ?, idUsuario = ? WHERE idComentario = ?';
    db.query(query, [comDescripcion, idUsuario, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar comentario:', err);
            return res.status(500).json({ message: 'Error al actualizar comentario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.json({ message: 'Comentario actualizado correctamente' });
    });
};

// DELETE
exports.deleteComentario = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM comentario WHERE idComentario = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar comentario:', err);
            return res.status(500).json({ message: 'Error al eliminar comentario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.json({ message: 'Comentario eliminado correctamente' });
    });
};