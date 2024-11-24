const express = require('express');
const router = express.Router();
const usuarioEspacioController = require('../controllers/usuarioEspacio');

// Obtener todas las relaciones
router.get('/', usuarioEspacioController.getAllUsuarioEspacios);

router.get('/:idUsuario/:idEspacio', usuarioEspacioController.getUsuarioEspacioById);

router.post('/', usuarioEspacioController.createUsuarioEspacio);

router.delete('/:idUsuario/:idEspacio', usuarioEspacioController.deleteUsuarioEspacio);

router.delete('/user/:idUsuario', usuarioEspacioController.deleteUsuarioEspaciosByUser);

module.exports = router;
