const Products = require('./product.model');

module.exports = {
  create: async function(productData) {
    try {
      const product = new Products(productData);
      return await product.save();
    } catch (err) {
      throw err;
    }
  },
  update: async function(productId, productData) {
    try {
      const product = await Products.findById(productId);
      if (!product) throw new Error('Product not found');
      Object.assign(product, productData);
      return await product.save();
    } catch (err) {
      throw err;
    }
  },
  delete: async function(productId) {
    try {
      const product = await Products.findById(productId);
   
      if (!product) throw new Error('Product not found');
      return await product.remove(); // call remove() method on the product instance
    } catch (err) {
      throw err;
    }
  },
  getById: async function(productId) {
    try {
      const product = await Products.findById(productId).populate('userid', 'name email');
      if (!product) throw new Error('Product not found');
      return product;
    } catch (err) {
      throw err;
    }
  },
  getAll: async function() {
    try {
      const products = await Products.find().populate('userid', 'name email');
      return products;
    } catch (err) {
      throw err;
    }
  },
  deleteAll: async function() {
    try {
      return await Products.deleteMany({});
    } catch (err) {
      throw err;
    }
  },
  findAllPublished: async function() {
    try {
      const products = await Products.find({ published: true });
      return products;
    } catch (error) {
      throw error;
    }
  },
  getAllByName: async function(name) {
    try {
      const products = await Products.find({ name: { $regex: name, $options: 'i' } }).populate('userid', 'name email');
      return products;
    } catch (err) {
      throw err;
    }
  }
};