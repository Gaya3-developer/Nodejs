const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/nodedynamic").then(() =>{
    console.log("connection successful");
}).catch((error) =>{
    console.log(error)
})