const db = require('../db');

// READ
exports.getAllEspacios = (req, res) => {
    const query = 'SELECT * FROM espacio';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener espacios:', err);
            return res.status(500).json({ message: 'Error al obtener espacios' });
        }
        res.json(results);
    });
};

// GET BY ID
exports.getEspacioById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM espacio WHERE idEspacio = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener espacio:', err);
            return res.status(500).json({ message: 'Error al obtener espacio' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Espacio no encontrado' });
        }
        res.json(results[0]);
    });
};

// CREATE
exports.createEspacio = (req, res) => {
    const { espTitulo, espColor, espFechaCreacion, idUsuario } = req.body;

    const getLastIdQuery = 'SELECT idEspacio FROM espacio ORDER BY idEspacio DESC LIMIT 1';

    db.query(getLastIdQuery, (err, result) => {
        if (err) {
            console.error('Error al obtener el último idEspacio:', err);
            return res.status(500).json({ message: 'Error al generar el ID del espacio' });
        }

        console.log('Último idEspacio:', result);

        let newIdEspacio;
        if (result.length === 0) {
            newIdEspacio = 'E000000001';
        } else {
            const lastId = result[0].idEspacio;
            const numericPart = parseInt(lastId.slice(1));
            newIdEspacio = `E${String(numericPart + 1).padStart(9, '0')}`;
        }

        console.log('Nuevo idEspacio generado:', newIdEspacio);
        if (!newIdEspacio) {
            return res.status(400).json({ message: 'Error al generar el nuevo idEspacio' });
        }

        const insertQuery = 'INSERT INTO espacio (idEspacio, espTitulo, espColor, espFechaCreacion, idUsuario) VALUES (?, ?, ?, ?, ?)';
        db.query(insertQuery, [newIdEspacio, espTitulo, espColor, espFechaCreacion, idUsuario], (err, result) => {
            if (err) {
                console.error('Error al insertar espacio:', err);
                return res.status(500).json({ message: 'Error al insertar espacio' });
            }
            res.status(201).json({ message: 'Espacio creado correctamente', idEspacio: newIdEspacio });
        });
    });
};


// UPDATE
exports.updateEspacio = (req, res) => {
    const { id } = req.params;
    const { espTitulo, espColor, idUsuario } = req.body;
    const query = 'UPDATE espacio SET espTitulo = ?, espColor = ?, idUsuario = ? WHERE idEspacio = ?';
    db.query(query, [espTitulo, espColor, idUsuario, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar espacio:', err);
            return res.status(500).json({ message: 'Error al actualizar espacio' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Espacio no encontrado' });
        }
        res.json({ message: 'Espacio actualizado correctamente' });
    });
};

// DELETE
exports.deleteEspacio = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM espacio WHERE idEspacio = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar espacio:', err);
            return res.status(500).json({ message: 'Error al eliminar espacio' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Espacio no encontrado' });
        }
        res.json({ message: 'Espacio eliminado correctamente' });
    });
};
