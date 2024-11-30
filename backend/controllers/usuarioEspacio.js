const db = require('../db');

// READ
exports.getAllUsuarioEspacios = (req, res) => {
    const query = 'SELECT * FROM usuario_espacio';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuario_espacio:', err);
            return res.status(500).json({ message: 'Error al obtener usuario_espacio' });
        }
        res.json(results);
    });
};

// GET BY ID (relación específica)
exports.getUsuarioEspacioById = (req, res) => {
    const { idUsuario, idEspacio } = req.params;
    const query = 'SELECT * FROM usuario_espacio WHERE idUsuario = ? AND idEspacio = ?';
    db.query(query, [idUsuario, idEspacio], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario_espacio:', err);
            return res.status(500).json({ message: 'Error al obtener usuario_espacio' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }
        res.json(results[0]);
    });
};

// CREATE
exports.createUsuarioEspacio = (req, res) => {
    const { idUsuario, idEspacio } = req.body;
    const query = 'INSERT INTO usuario_espacio (idUsuario, idEspacio) VALUES (?, ?)';
    db.query(query, [idUsuario, idEspacio], (err, result) => {
        if (err) {
            console.error('Error al insertar usuario_espacio:', err);
            return res.status(500).json({ message: 'Error al insertar usuario_espacio' });
        }
        res.status(201).json({ message: 'Relación creada correctamente', id: result.insertId });
    });
};

// Obtener los usuarios de un espacio
exports.getUsuariosPorEspacio = (req, res) => {
    const { idEspacio } = req.params;
    const query = `
        SELECT idUsuario
        FROM usuario_espacio 
        WHERE idEspacio = ?
    `;

    db.query(query, [idEspacio], (err, result) => {
        if (err) {
            console.error('Error al obtener los usuarios del espacio:', err);
            return res.status(500).json({ message: 'Error al obtener los usuarios' });
        }
        res.status(200).json(result);  // Devuelve solo los idUsuario
    });
};

// GET SPACES BY USER
exports.getEspaciosPorUsuario = (req, res) => {
    const { idUsuario } = req.params;  // Recuperamos el idUsuario de la URL
    console.log(idUsuario)

    // Consulta SQL para obtener los espacios asociados al idUsuario
    const query = `
        SELECT idEspacio
        FROM usuario_espacio
        WHERE idUsuario = ?
    `;

    // Ejecutamos la consulta SQL
    db.query(query, [idUsuario], (err, result) => {
        if (err) {
            console.error('Error al obtener los espacios del usuario:', err);
            return res.status(500).json({ message: 'Error al obtener los espacios del usuario' });
        }

        // Si no se encuentran resultados, devolvemos un mensaje adecuado
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron espacios para el usuario' });
        }

        // Devolvemos los resultados (idEspacio) como respuesta
        res.status(200).json(result);
        console.log(result)
    });
};

// DELETE (relación específica)
exports.deleteUsuarioEspacio = (req, res) => {
    const { idUsuario, idEspacio } = req.params;
    const query = 'DELETE FROM usuario_espacio WHERE idUsuario = ? AND idEspacio = ?';
    db.query(query, [idUsuario, idEspacio], (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario_espacio:', err);
            return res.status(500).json({ message: 'Error al eliminar usuario_espacio' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }
        res.json({ message: 'Relación eliminada correctamente' });
    });
};

// DELETE ALL BY USER
exports.deleteUsuarioEspaciosByUser = (req, res) => {
    const { idUsuario } = req.params;
    const query = 'DELETE FROM usuario_espacio WHERE idUsuario = ?';
    db.query(query, [idUsuario], (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario_espacio por usuario:', err);
            return res.status(500).json({ message: 'Error al eliminar usuario_espacio por usuario' });
        }
        res.json({ message: 'Relaciones eliminadas correctamente', affectedRows: result.affectedRows });
    });
};
