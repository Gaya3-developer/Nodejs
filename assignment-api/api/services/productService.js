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
const XLSX = require('xlsx');

class ProductService {
  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(productId) {
    return await Product.findById(productId);
  }

  async addProduct(productData) {
   
    // Get the uploaded files from the request
    const files = [...productData.file];
    // Process the files and extract the filenames
    const images = files.map(file => file.filename);
  
    // Get the other product data from the request body
    const { name, description, userId, published, price, rating } = productData.body;
  
    // Create a new product object with the data, including the images field
    const product = new Product({
      name,
      description,
      userId,
      published,
      image : images, // Include the images field here
      price,
      rating
    });

    // Save the product to the database
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
 async getAllSortedByPrice(){
    return await Product.find().sort({ price: 1 }); 
  };
  async getAllSortedByRating(){
    return await Product.find().sort({ rating: -1 });
  };
  async  exportProductsToExcel() {
    try {
      // Fetch all products from the database
      const products = await Product.find().populate('userId', 'name email');
  
      // Create a workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(products);
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
  
      // Generate a buffer from the workbook
      const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  
      // Save the buffer to a file or send it as a response
      // For example, if you want to save the file locally:
      const filename = 'products.xlsx';
      XLSX.writeFile(workbook, filename);
  
      return filename;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductService;