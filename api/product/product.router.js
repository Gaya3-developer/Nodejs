const express = require('express');
const router = express.Router();
const productsController = require('./product.controller');

router.post('/', productsController.create);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);
router.get('/:id', productsController.getById);
router.get('/', productsController.getAll);
router.delete('/', productsController.deleteAll);
router.get('/published', productsController.findAllPublished);
module.exports = router;