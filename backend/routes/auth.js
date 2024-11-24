// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// INICIO DE SESIÓN
router.post('/login', (req, res) => {
    const { email, contrasena } = req.body;

    db.query('SELECT * FROM usuario WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const user = results[0]; 
        const isPasswordValid = contrasena === user.contrasena;

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: user.idUsuario, email: user.email }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );
        

        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user, 
        });
    });
});

// REGISTRO
router.post('/register', (req, res) => {
    const { nombre, apellido, nombreUsuario, email, contrasena, imagenUrl } = req.body;

    db.query('SELECT * FROM usuario WHERE email = ?', [email], (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        db.query('SELECT idUsuario FROM usuario ORDER BY idUsuario DESC LIMIT 1', (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener el último ID de usuario' });
            }

            let newId;
            if (result.length === 0) {
                newId = 'U000000001';
            } else {
                const lastId = result[0].idUsuario;
                const numPart = parseInt(lastId.slice(1)) + 1;
                newId = `U${String(numPart).padStart(9, '0')}`;
            }

            const query = 'INSERT INTO usuario (idUsuario, nombre, apellido, nombreUsuario, email, contrasena, imagenUrl) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.query(query, [newId, nombre, apellido, nombreUsuario, email, contrasena, imagenUrl], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al registrar el usuario' });
                }
                res.status(201).json({ message: 'Usuario registrado exitosamente', idUsuario: newId });
            });
        });
    });
});

module.exports = router;
