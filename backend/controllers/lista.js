const db = require('../db');

// READ
exports.getAllListas = (req, res) => {
    const query = 'SELECT * FROM lista';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener listas:', err);
            return res.status(500).json({ message: 'Error al obtener listas' });
        }
        res.json(results);
    });
};

// GET BY ID
exports.getListaById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM lista WHERE idLista = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener lista:', err);
            return res.status(500).json({ message: 'Error al obtener lista' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Lista no encontrada' });
        }
        res.json(results[0]);
    });
};

// CREATE
exports.createLista = (req, res) => {
    const { idLista, lisTitulo, lisColor, lisFechaCreacion, idTablero } = req.body;
    const query = 'INSERT INTO lista (idLista, lisTitulo, lisColor, lisFechaCreacion, idTablero) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [idLista, lisTitulo, lisColor, lisFechaCreacion, idTablero], (err, result) => {
        if (err) {
            console.error('Error al insertar lista:', err);
            return res.status(500).json({ message: 'Error al insertar lista' });
        }
        res.status(201).json({ message: 'Lista creada correctamente', id: result.insertId });
    });
};

// UPDATE
exports.updateLista = (req, res) => {
    const { id } = req.params;
    const { lisTitulo, lisColor, lisFechaCreacion, idTablero } = req.body;
    const query = 'UPDATE lista SET lisTitulo = ?, lisColor = ?, lisFechaCreacion = ?, idTablero = ? WHERE idLista = ?';
    db.query(query, [lisTitulo, lisColor, lisFechaCreacion, idTablero, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar lista:', err);
            return res.status(500).json({ message: 'Error al actualizar lista' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Lista no encontrada' });
        }
        res.json({ message: 'Lista actualizada correctamente' });
    });
};

// DELETE
exports.deleteLista = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM lista WHERE idLista = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar lista:', err);
            return res.status(500).json({ message: 'Error al eliminar lista' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Lista no encontrada' });
        }
        res.json({ message: 'Lista eliminada correctamente' });
    });
};
