const productModel = require('./product.model');

module.exports = {
    create:(data)=>{
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