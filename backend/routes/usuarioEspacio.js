const express = require('express');
const router = express.Router();
const usuarioEspacioController = require('../controllers/usuarioEspacio');

// Obtener todas las relaciones
router.get('/', usuarioEspacioController.getAllUsuarioEspacios);

router.post('/', usuarioEspacioController.createUsuarioEspacio);

router.get('/:idUsuario', usuarioEspacioController.getEspaciosPorUsuario);

router.get('/:idUsuario/:idEspacio', usuarioEspacioController.getUsuarioEspacioById);

router.delete('/:idUsuario/:idEspacio', usuarioEspacioController.deleteUsuarioEspacio);

router.delete('/user/:idUsuario', usuarioEspacioController.deleteUsuarioEspaciosByUser);

router.get('/:idEspacio', usuarioEspacioController.getUsuariosPorEspacio);

module.exports = router;
