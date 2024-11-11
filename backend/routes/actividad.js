const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividad');

router.get('/', actividadController.getAllActividades);

router.get('/:id', actividadController.getActividadById);

router.post('/', actividadController.createActividad);

router.put('/:id', actividadController.updateActividad);

router.delete('/:id', actividadController.deleteActividad);

module.exports = router;