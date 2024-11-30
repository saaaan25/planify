const express = require('express');
const router = express.Router();
const usuarioEspacioController = require('../controllers/usuarioEspacio');

// Obtener todas las relaciones
router.get('/', usuarioEspacioController.getAllUsuarioEspacios);

// Crear una relación (usuario-espacio)
router.post('/', usuarioEspacioController.createUsuarioEspacio);

// Ruta para obtener los espacios de un usuario (debe ir antes que las rutas más generales)
router.get('/usuario/:idUsuario', usuarioEspacioController.getEspaciosPorUsuario);

// Ruta para obtener los usuarios de un espacio (debe ir después de la anterior)
router.get('/espacio/:idEspacio', usuarioEspacioController.getUsuariosPorEspacio);

// Ruta con parámetros dinámicos (usuario-espacio específico)
router.get('/:idUsuario/:idEspacio', usuarioEspacioController.getUsuarioEspacioById);

// Eliminar una relación (usuario-espacio)
router.delete('/:idUsuario/:idEspacio', usuarioEspacioController.deleteUsuarioEspacio);

// Eliminar todas las relaciones de un usuario
router.delete('/user/:idUsuario', usuarioEspacioController.deleteUsuarioEspaciosByUser);

module.exports = router;
