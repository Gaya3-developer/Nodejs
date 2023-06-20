// const express = require('express');
// const router = express.Router();
// const UserController = require('../controllers/userController');
// const authenticateToken = require('../middleware/authenticateToken');
// const authorizeAdmin = require('../middleware/authorizeAdmin');

// const userController = new UserController();

// // User routes
// router.post('/', authenticateToken, authorizeAdmin, userController.createUser);
// router.put('/:id', authenticateToken, authorizeAdmin, userController.updateUser);
// router.delete('/:id', authenticateToken, authorizeAdmin, userController.deleteUser);

// module.exports = router;


const express = require('express');
const UserController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();
const userController = new UserController();

//router.post('/',  userController.createUser);
router.post('/',verifyToken,  userController.createUser);
router.put('/:id', verifyToken, userController.updateUser);
router.post('/signin', userController.signIn);
module.exports = router;