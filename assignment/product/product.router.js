const productController = require('./product.controller');
const router = require('express').Router();

router.post("/add",productController.create)

module.exports = router;