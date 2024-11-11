const express = require('express');
const router = express.Router();
const tableroController = require('../controllers/tablero');

router.get('/', tableroController.getAllTableros);

router.get('/:id', tableroController.getTableroById);

router.post('/', tableroController.createTablero);

router.put('/:id', tableroController.updateTablero);

router.delete('/:id', tableroController.deleteTablero);

module.exports = router;
