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

// const multer = require('multer');

// // Define the storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Specify the destination folder for uploaded files
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     // Generate a unique filename for the uploaded file
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   },
// });

// // Create the Multer middleware
// const upload = multer({ storage: storage });

const multer = require('multer');

// Define the storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder for uploaded files
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

// Create the Multer middleware for multiple files
const upload = multer({ storage: storage }).array('images', 5); // 'files' is the field name for multiple files, and 5 is the maximum number of files allowed



router.get('/sort/price',verifyToken, productController.getAllSortedByPrice);
router.get('/sort/rating',verifyToken, productController.getAllSortedByRating);
router.get('/export', verifyToken, productController.exportAllProducts);
router.get('/published', verifyToken, productController.findPublishedProducts);
router.get('/:userId', verifyToken, productController.findProductsByUserId);
router.get('/', verifyToken, productController.getAllProducts);
router.get('/:id', verifyToken, productController.getProductById);
router.post('/', verifyToken, upload, productController.addProduct);
router.put('/:id', verifyToken, productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);
router.delete('/', verifyToken, productController.deleteAllProducts);

router.get('/', verifyToken, productController.findProductsByName);


module.exports = router;