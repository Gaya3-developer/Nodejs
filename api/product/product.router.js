const express = require('express');
const router = express.Router();
const productsController = require('./product.controller');
const verifyToken = require('./auth.middleware');
router.post('/',verifyToken, productsController.create, (req, res) => {
    // Your code here
  });
router.put('/:id',verifyToken, productsController.update);
router.get('/published',verifyToken, productsController.findAllPublished);
router.get('/search',verifyToken, productsController.getAllByName);
router.delete('/:id',verifyToken, productsController.delete);
router.get('/:id',verifyToken, productsController.getById);
router.get('/', verifyToken,productsController.getAll);
router.delete('/', verifyToken,productsController.deleteAll);

module.exports = router;