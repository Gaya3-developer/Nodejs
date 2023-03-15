const mongoose = require('mongoose');
require("dotenv").config();
module.exports = function(){
    mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser : true
    }
    );
    mongoose.connection.on("connected",()=>{
     
        console.log("DB connected")

    })
}
