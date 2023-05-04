const db=require('../models')



const Product=db.products

//create product

const addProduct=async (req,res)=>{
  // const file=req.file
if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
    
  }
  const product={
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    published:req.body.published,
    img:req.files.map((file) => file.filename),
    rating:req.body.rating,
    category:req.body.category,
    createdby:req.body.createdby

  }
  Product.create(product)
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.status(500).send({
        msg:
        err.message||"some error occured"
    })
  })

}

//get all products
const getAllProducts = async (req, res) => {//?page=a&size=b
  // Pagination
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  console.log(pageAsNumber, sizeAsNumber);
  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }
  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
    size = sizeAsNumber;
  }
  const products = await Product.findAndCountAll({
    limit: size,
    offset: (page - 1) * size,
  });
  // console.log(products.rows);
  res.status(200).send({
    content: products.rows,
    totalPages: Math.ceil(products.count / size),
  });
};



//gew single product by id
const getSingleProduct=(async(req,res)=>{
    let id=req.params.id
    let product=await Product.findOne({where:{id:id}})
    res.status(200).send(product)
})

//get single product by name

const { Op } = require('sequelize');

const getSingleProductbyName = async (req, res) => {
  const name = req.params.name;
  const product = await Product.findAll({
    where: {
      name: {
        [Op.iRegexp]: name, // use Op.iRegexp for case-insensitive search using regular expression
      },
    },
  });
  res.status(200).send(product);
};


//update product
const updateProduct=(async(req,res)=>{
    let id=req.params.id
    // if(id===Product.createdby){
      let product=await Product.update(req.body,{where:{id:id}})
    res.status(200).send(product)
    // }
    // else{
      res.send('unauthorized access')
    // }
    
})


//delete product by id
const deleteProduct=(async(req,res)=>{
    let id=req.params.id
    await Product.destroy({where:{id:id}})
    res.status(200).send("product deleted")
})

//pulished products
const publishedProducts = async (req, res) => {
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
      size = sizeAsNumber;
    }
    const products = await Product.findAndCountAll({
      where: { published: true },
      limit: size,
      offset: (page - 1) * size,
    });

    res.status(200).send({
      content: products.rows,
      totalPages: Math.ceil(products.count / size),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

//get sorted products
const getSortedProducts = async (req, res) => {
  
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
      size = sizeAsNumber;
    }

    // Get the sort parameter from the request query
    const sort = req.query.q;//?q=price-asc

    //default sorting options
    let orderOptions = [["id", "ASC"]];

    // Modifying the sorting options based on the sort parameter
    switch (sort) {
      case "rating-asc":
        orderOptions = [["rating", "ASC"]];
        break;
      case "rating-desc":
        orderOptions = [["rating", "DESC"]];
        break;
      case "price-asc":
        orderOptions = [["price", "ASC"]];
        break;
      case "price-desc":
        orderOptions = [["price", "DESC"]];
        break;
      default:
        break;
    }

    const products = await Product.findAndCountAll({
      order: orderOptions,
      offset: (page - 1) * size,
      limit: size,
      raw: true,
    });
    const content = products.rows.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      rating: product.rating,
    }));

    res.status(200).send({
      content: content,
      totalPages: Math.ceil(products.count / size),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Internal server error",
    });
  }
};



//get products by user
const getByUser=(async(req,res)=>{
  let id=req.params.id
  let product=await Product.findAll({where:{createdby:id}})
  res.status(200).send(product)
})

//delete All products
const deleteAllProduct=(async(req,res)=>{
  await Product.destroy()
  res.status(200).send("product deleted")
})

//update based on userId

const updateProductonUser=(async(req,res)=>{
  let id=req.params.userid
  let product=await Product.update(req.body,{where:{createdby:id}})
  res.status(200).send(product)
})

//get products by category
const getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const size = req.query.size ? parseInt(req.query.size) : 10;

  const offset = (page - 1) * size;
  const limit = size;

  const where = { category };

  const products = await Product.findAndCountAll({ where, offset, limit });

  const totalPages = Math.ceil(products.count / size);

  res.status(200).send({
    content: products.rows,
    totalPages,
    currentPage: page,
    pageSize: size,
  });

};


//filtering based on rating
const getRatedProducts = async (req, res) => {

  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    const ratingAsNumber = Number.parseFloat(req.query.rating);

    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
      size = sizeAsNumber;
    }

    let rating = 0.0;
    if (!Number.isNaN(ratingAsNumber) && ratingAsNumber >= 0) {
      rating = ratingAsNumber;
    }

    const filterOptions = {
      where: {
        rating: {
          [Op.gte]: rating,
        },
      },
      limit: size,
      offset: (page - 1) * size,
    };

    const products = await Product.findAndCountAll(filterOptions);

    const content = products.rows.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      rating: product.rating,
      img: product.img,
      category: product.category,
    }));

    res.status(200).send({
      content: content,
      totalPages: Math.ceil(products.count / size),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Internal server error",
    });
  }
};



module.exports={
    addProduct,
    getAllProducts,
    getSingleProduct,
    getSingleProductbyName,
    updateProduct,
    deleteProduct,
    publishedProducts,
    getSortedProducts,
    getByUser,
    deleteAllProduct,
    updateProductonUser,
    getProductsByCategory,
    getRatedProducts
}


