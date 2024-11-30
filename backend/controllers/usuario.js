const db = require('../db');

// READ
exports.getAllUsuarios = (req, res) => {
    const query = 'SELECT * FROM usuario';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({ message: 'Error al obtener usuarios' });
        }
        res.json(results);
    });
};

// GET BY ID
exports.getUsuarioById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM usuario WHERE idUsuario = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario:', err);
            return res.status(500).json({ message: 'Error al obtener usuario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(results[0]);
    });
};

// CREATE
exports.createUsuario = (req, res) => {
    const { idUsuario, nombre, apellido, nombreUsuario, email, contrasena, imagenUrl } = req.body;
    const query = 'INSERT INTO usuario (idUsuario, nombre, apellido, nombreUsuario, email, contrasena, imagenUrl) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [idUsuario, nombre, apellido, nombreUsuario, email, contrasena, imagenUrl], (err, result) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            return res.status(500).json({ message: 'Error al insertar usuario' });
        }
        res.status(201).json({ message: 'Usuario creado correctamente', id: result.insertId });
    });
};

// UPDATE
exports.updateUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, nombreUsuario, email, contrasena, imagenUrl } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!nombre || !apellido || !nombreUsuario || !email) {
        return res.status(400).json({ message: 'Los campos nombre, apellido, nombreUsuario y email son obligatorios' });
    }

    // Preparamos los valores para la actualización
    const updateValues = [nombre, apellido, nombreUsuario, email, imagenUrl, id];

    // Si se proporciona una contraseña, la incluimos en la actualización
    if (contrasena) {
        updateValues.splice(4, 0, contrasena); // Inserta la contraseña en el lugar correcto
    }

    // Consulta SQL para actualizar los datos del usuario
    const query = 'UPDATE usuario SET nombre = ?, apellido = ?, nombreUsuario = ?, email = ?, contrasena = ?, imagenUrl = ? WHERE idUsuario = ?';

    // Ejecutamos la consulta
    db.query(query, updateValues, (err, result) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            return res.status(500).json({ message: 'Error al actualizar usuario' });
        }

        // Verificamos si se encontró el usuario para actualizar
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Respuesta exitosa
        res.json({ message: 'Usuario actualizado correctamente' });
    });
};

// DELETE
exports.deleteUsuario = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuario WHERE idUsuario = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({ message: 'Error al eliminar usuario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    });
};
