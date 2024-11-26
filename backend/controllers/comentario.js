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
    const { comDescripcion, idUsuario, idLista } = req.body;

    const query = 'SELECT idComentario FROM comentario ORDER BY idComentario DESC LIMIT 1';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener el último comentario:', err);
            return res.status(500).json({ message: 'Error al obtener el último comentario' });
        }

        let newIdComentario = 'C000000001';
        if (results.length > 0) {
            const lastId = results[0].idComentario;
            const lastNumber = parseInt(lastId.slice(1), 10);
            const newNumber = lastNumber + 1;
            newIdComentario = `C${newNumber.toString().padStart(9, '0')}`;
        }

        const insertQuery = 'INSERT INTO comentario (idComentario, comDescripcion, idUsuario, idLista) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [newIdComentario, comDescripcion, idUsuario, idLista], (err, result) => {
            if (err) {
                console.error('Error al insertar comentario:', err);
                return res.status(500).json({ message: 'Error al insertar comentario' });
            }
            res.status(201).json({ message: 'Comentario creado correctamente', id: result.insertId });
        });
    });
};

// UPDATE
exports.updateComentario = (req, res) => {
    const { id } = req.params;
    const { comDescripcion, idUsuario, idLista } = req.body;
    const query = 'UPDATE comentario SET comDescripcion = ?, idUsuario = ?, idLista = ? WHERE idComentario = ?';
    db.query(query, [comDescripcion, idUsuario, idLista, id], (err, result) => {
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