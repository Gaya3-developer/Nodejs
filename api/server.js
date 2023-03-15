const express = require('express');
const app = express();
const DB = require('./config/database.js')
const productRouter =  require('./product/product.router')
require('dotenv').config();
// app.get('/api',(req,res) => {
//  res.json({
//     success: 1,
//     message : "I am listening"
//  })
// })

DB();
app.use(express.json())
app.use("/api/p",productRouter)
app.listen(process.env.PORT,()=>{
    console.log('server running in port number '+ process.env.PORT)
})