const productModel = require('./product.model');

module.exports = {
    create:(data)=>{
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            userid: req.body.userid,
            published: req.body.published,
            image: req.body.image,
            price: req.body.price,
            rating: req.body.rating,
            createdBy: req.body.createdBy
          });
        return productModel.create(data);
    },
    list:()=>{
        return productModel.find();
    },
    getProductById:(id)=>{
       return productModel.findById(id);
    },
    updateProduct:(id,data)=>{
        return productModel.findByIdAndUpdate(id,data);
    },
    deleteProduct:(id)=>{
        return productModel.deleteOne({ _id:id });
    }
}