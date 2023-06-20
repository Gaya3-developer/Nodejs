const express = require('express');
const connectDB = require('./db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const verifyToken = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Apply JWT token for all API routes
 //app.use(authenticateToken);

// Product routes
app.use('/api/products',verifyToken, productRoutes);

// User routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});