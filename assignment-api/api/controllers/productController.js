// const ProductService = require('../services/productService');

// const productService = new ProductService();

// class ProductController {
//   async getAllProducts(req, res) {
//     try {
//       const products = await productService.getAllProducts();
//       res.json(products);
//     } catch (error) {
//       console.error('Error getting products', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async getProductById(req, res) {
//     try {
//       const { id } = req.params;
//       const product = await productService.getProductById(id);
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
//       res.json(product);
//     } catch (error) {
//       console.error('Error getting product by ID', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async createProduct(req, res) {
//     try {
//       const productData = req.body;
//       const product = await productService.createProduct(productData);
//       res.status(201).json(product);
//     } catch (error) {
//       console.error('Error creating product', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
//   async updateProduct(req, res) {
//     try {
//       const { id } = req.params;
//       const productData = req.body;
//       const updatedProduct = await productService.updateProduct(id, productData);
//       if (!updatedProduct) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
//       res.json(updatedProduct);
//     } catch (error) {
//       console.error('Error updating product', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async deleteProduct(req, res) {
//     try {
//       const { id } = req.params;
//       const deletedProduct = await productService.deleteProduct(id);
//       if (!deletedProduct) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
//       res.json({ message: 'Product deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting product', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async deleteAllProducts(req, res) {
//     try {
//       await productService.deleteAllProducts();
//       res.json({ message: 'All products deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting all products', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async getPublishedProducts(req, res) {
//     try {
//       const products = await productService.getPublishedProducts();
//       res.json(products);
//     } catch (error) {
//       console.error('Error getting published products', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async findProductsByName(req, res) {
//     try {
//       const { name } = req.query;
//       const products = await productService.findProductsByName(name);
//       res.json(products);
//     } catch (error) {
//       console.error('Error finding products by name', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async getProductsByUserId(req, res) {
//     try {
//       const { userId } = req.params;
//       const products = await productService.getProductsByUserId(userId);
//       res.json(products);
//     } catch (error) {
//       console.error('Error getting products by user ID', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// }

// module.exports = ProductController;


const ProductService = require('../services/productService');
const Product = require('../models/product');
const productService = new ProductService();
class ProductController {
  
  async getAllProducts(req, res) {
    const creatingUser = req.userId; 
    const creatingUserRole = req.userRole; 
    if (creatingUserRole !== 'admin') {
      console.log('user')
    //  return res.status(401).json({ error: 'Only Admin users can create new users' });
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
    }
    else{
      console.log('admin')
      try {
        // Get the filter parameters from the query string
        const { name, description, price, rating } = req.query;
  
        // Get the pagination parameters from the query string
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
  
        // Construct the filter object based on the provided parameters
        const filter = {};
        if (name) filter.name = { $regex: name, $options: 'i' };
        if (description) filter.description = { $regex: description, $options: 'i' };
        if (price) filter.price = parseInt(price);
        if (rating) filter.rating = parseInt(rating);
  
        // Query the products with the filter and pagination options
        const products = await Product.find(filter)
          .skip((page - 1) * limit)
          .limit(limit);
  
        // Count the total number of products that match the filter
        const totalCount = await Product.countDocuments(filter);
  
        res.json({ products, totalCount });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  
  }
  async getAllProductsWithPagination(req, res) {
    try {
      // Get the filter parameters from the query string
      const { name, description, price, rating } = req.query;

      // Get the pagination parameters from the query string
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Construct the filter object based on the provided parameters
      const filter = {};
      if (name) filter.name = { $regex: name, $options: 'i' };
      if (description) filter.description = { $regex: description, $options: 'i' };
      if (price) filter.price = parseInt(price);
      if (rating) filter.rating = parseInt(rating);

      // Query the products with the filter and pagination options
      const products = await Product.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);

      // Count the total number of products that match the filter
      const totalCount = await Product.countDocuments(filter);

      res.json({ products, totalCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProductById(req, res) {
    try {
      const productId = req.params.id;
      const product = await productService.getProductById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async addProduct(req, res) {
    try {
      const productData = req.body;
      const product = await productService.addProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updatedProductData = req.body;
      const product = await productService.updateProduct(productId, updatedProductData);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      await productService.deleteProduct(productId);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteAllProducts(req, res) {
    try {
      await productService.deleteAllProducts();
      res.json({ message: 'All products deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async findPublishedProducts(req, res) {
    console.log("hoooo")
    try {
      const products = await productService.findPublishedProducts();
     
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async findProductsByName(req, res) {
    try {
      const name = req.query.name;
      const products = await productService.findProductsByName(name);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async findProductsByUserId(req, res) {
    try {
      const userId = req.params.userId;
      const products = await productService.findProductsByUserId(userId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async getAllSortedByPrice(req, res){
    try {
      const products = await productService.getAllSortedByPrice();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  async getAllSortedByRating(req, res){
    try {
      const products = await productService.getAllSortedByRating();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ProductController;