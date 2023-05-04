// const Product = require('../models/product');

// class ProductService {
//   async getAllProducts() {
//     return await Product.find();
//   }

//   async getProductById(id) {
//     return await Product.findById(id);
//   }

//   async createProduct(productData) {
//     return await Product.create(productData);
//   }

//   async updateProduct(id, productData) {
//     return await Product.findByIdAndUpdate(id, productData, { new: true });
//   }

//   async deleteProduct(id) {
//     return await Product.findByIdAndDelete(id);
//   }

//   async deleteAllProducts() {
//     return await Product.deleteMany();
//   }

//   async getPublishedProducts() {
//     return await Product.find({ published: true });
//   }

//   async findProductsByName(name) {
//     return await Product.find({ name: { $regex: name, $options: 'i' } });
//   }

//   async getProductsByUserId(userId) {
//     return await Product.find({ userId });
//   }
// }

// module.exports = ProductService;

const Product = require('../models/product');

class ProductService {
  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(productId) {
    return await Product.findById(productId);
  }

  async addProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async updateProduct(productId, updatedProductData) {
    const product = await Product.findById(productId);
    Object.assign(product, updatedProductData);
    return await product.save();
  }

  async deleteProduct(productId) {
    return await Product.findByIdAndRemove(productId);
  }

  async deleteAllProducts() {
    return await Product.deleteMany();
  }

  async findPublishedProducts() {
    return await Product.find({ published: true });
  }

  async findProductsByName(name) {
    return await Product.find({ name: { $regex: name, $options: 'i' } });
  }

  async findProductsByUserId(userId) {
    return await Product.find({ userId });
  }
}

module.exports = ProductService;