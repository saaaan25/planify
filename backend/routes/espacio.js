// backend/routes/espacioRoutes.js
const express = require('express');
const router = express.Router();
const espacioController = require('../controllers/espacio');

router.get('/', espacioController.getAllEspacios);

router.get('/:id', espacioController.getEspacioById);

router.post('/', espacioController.createEspacio);

router.put('/:id', espacioController.updateEspacio);

router.delete('/:id', espacioController.deleteEspacio);


module.exports = router;