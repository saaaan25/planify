const db = require('../db');

// READ
exports.getAllTableros = (req, res) => {
    const query = 'SELECT * FROM tablero';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener tableros:', err);
            return res.status(500).json({ message: 'Error al obtener tableros' });
        }
        res.json(results);
    });
};

// GET BY ID
exports.getTableroById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM tablero WHERE idTablero = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener tablero:', err);
            return res.status(500).json({ message: 'Error al obtener tablero' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Tablero no encontrado' });
        }
        res.json(results[0]);
    });
};

// CREATE
exports.createTablero = (req, res) => {
    const { idTablero, tabTitulo, tabFechaCreacion, tabColor, idEspacio } = req.body;
    const query = 'INSERT INTO tablero (idTablero, tabTitulo, tabFechaCreacion, tabColor, idEspacio) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [idTablero, tabTitulo, tabFechaCreacion, tabColor, idEspacio], (err, result) => {
        if (err) {
            console.error('Error al insertar tablero:', err);
            return res.status(500).json({ message: 'Error al insertar tablero' });
        }
        res.status(201).json({ message: 'Tablero creado correctamente', id: result.insertId });
    });
};

// UPDATE
exports.updateTablero = (req, res) => {
    const { id } = req.params;
    const { tabTitulo, tabFechaCreacion, tabColor, idEspacio } = req.body;
    const query = 'UPDATE tablero SET tabTitulo = ?, tabFechaCreacion = ?, tabColor = ?, idEspacio = ? WHERE idTablero = ?';
    db.query(query, [tabTitulo, tabFechaCreacion, tabColor, idEspacio, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar tablero:', err);
            return res.status(500).json({ message: 'Error al actualizar tablero' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tablero no encontrado' });
        }
        res.json({ message: 'Tablero actualizado correctamente' });
    });
};

// DELETE
exports.deleteTablero = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tablero WHERE idTablero = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar tablero:', err);
            return res.status(500).json({ message: 'Error al eliminar tablero' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tablero no encontrado' });
        }
        res.json({ message: 'Tablero eliminado correctamente' });
    });
};