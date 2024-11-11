const express = require('express');
const router = express.Router();
const listaController = require('../controllers/lista');

router.get('/', listaController.getAllListas);

router.get('/:id', listaController.getListaById);

router.post('/', listaController.createLista);

router.put('/:id', listaController.updateLista);

router.delete('/:id', listaController.deleteLista);

module.exports = router;
