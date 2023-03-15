const productService = require('./product.service');

module.exports = {
    create:(req,res) =>{
const body = req.body;
productService.create(body).then(results => {
    if(results){
        res.json({
            success : 1,
            message:"data inserted successfully",
            data:results
        })
    }
    else{
        res.json({
            success : 0,
            message:"failed to insert data",
        })
    }
  
})
    }
}