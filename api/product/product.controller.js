const productService = require('./product.service');

module.exports = {
  create: async function(req, res, next) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  },
  update: async function(req, res, next) {
    try {
      const productId = req.params.id;
      const product = await productService.update(productId, req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },
  delete: async function(req, res, next) {
    try {
      const productId = req.params.id;
      await productService.delete(productId);
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      next(err);
    }
  },
  getById: async function(req, res, next) {
    try {
      const productId = req.params.id;
      const product = await productService.getById(productId);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },
  getAll: async function(req, res, next) {
    try {
      const products = await productService.getAll();
      res.json(products);
    } catch (err) {
      next(err);
    }
  },
  deleteAll : async function(req, res, next) {
    try {
      await productService.deleteAll();
      return res.status(200).json({
        message: 'All products deleted successfully'
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  },
  findAllPublished : async (req, res, next) => {
    try {
      const products = await productService.findAllPublished();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
}
}