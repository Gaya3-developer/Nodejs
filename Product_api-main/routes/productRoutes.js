const productController=require('../controllers/productController.js')
const router=require('express').Router()
const auth=require('../middlewares/authentication.js')
const validateToken=require('../middlewares/auth.js')
const upload=require('../middlewares/upload.js')
const path=require('path')


router.get('/published',validateToken,productController.publishedProducts)

router.post('/products' ,upload.array('img'),validateToken,productController.addProduct)

router.get('/products' ,validateToken,productController.getAllProducts)

router.get('/products/:name',validateToken,productController.getSingleProductbyName)

router.get('/product/:id' ,validateToken,productController.getSingleProduct)

router.put('/product/:id',validateToken,auth ,productController.updateProduct)

router.delete('/products/:id',validateToken,auth ,productController.deleteProduct)

router.delete('/products/',validateToken,auth ,productController.deleteAllProduct)

// router.get('/products/sort',validateToken, productController.getSortedProducts)

router.get('/productss',productController.getSortedProducts)

router.get('/product/by/:id',validateToken,productController.getByUser)

// router.put('/products/:userid',validateToken,auth ,productController.updateProduct)

router.get('/product/category/:category', productController.getProductsByCategory);

router.get('/product/rate/rating',validateToken,productController.getRatedProducts)

router.get('/image/:filename', (req, res) => {
    const filePath = path.join(__dirname, `../uploads/${req.params.filename}`);
    res.sendFile(filePath);
  });

module.exports=router






