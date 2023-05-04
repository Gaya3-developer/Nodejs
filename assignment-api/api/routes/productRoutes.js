// const express = require('express');
// const router = express.Router();
// const ProductController = require('../controllers/productController');
// const authenticateToken = require('../middleware/authenticateToken');

// const productController = new ProductController();

// // Product routes
// router.get('/', authenticateToken, productController.getAllProducts);
// router.get('/:id', authenticateToken, productController.getProductById);
// router.post('/', authenticateToken, productController.createProduct);
// router.put('/:id', authenticateToken, productController.updateProduct);
// router.delete('/:id', authenticateToken, productController.deleteProduct);
// router.delete('/', authenticateToken, productController.deleteAllProducts);
// router.get('/published', authenticateToken, productController.getPublishedProducts);
// router.get('/name', authenticateToken, productController.findProductsByName);
// router.get('/user/:userId', authenticateToken, productController.getProductsByUserId);

// module.exports = router;

const express = require('express');
const ProductController = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware');
const  isAdmin= require('../middleware/isAdminMiddleware');
const router = express.Router();
const productController = new ProductController();

// router.get('/', verifyToken, productController.getAllProducts);
//router.get('/product', verifyToken, isAdmin, productController.getAllProductsWithPagination);
router.get('/', verifyToken, productController.getAllProducts);
router.get('/:id', verifyToken, productController.getProductById);
router.post('/', verifyToken, productController.addProduct);
router.put('/:id', verifyToken, productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);
router.delete('/', verifyToken, productController.deleteAllProducts);
router.get('/published', verifyToken, productController.findPublishedProducts);
router.get('/', verifyToken, productController.findProductsByName);
router.get('/:userId', verifyToken, productController.findProductsByUserId);

module.exports = router;