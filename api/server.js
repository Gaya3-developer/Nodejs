const express = require('express');
const mongoose = require('mongoose');
const productsRouter = require('./product/product.router');

// Create Express app
const app = express();

// Configure app to parse JSON data in the request body
app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/eshoping', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('MongoDB connected successfully');
});

// Use Products router
app.use('/api/products', productsRouter);

// Default error handler middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Server started listening on port ${port}`);
});