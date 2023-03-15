const mongoose = require('mongoose');
require("dotenv").config();
module.exports = function(){
    // Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));
    // mongoose.connect(process.env.MONGODB_URI,
    // {
    //     useNewUrlParser : true
    // }
    // );
    // mongoose.connection.on("connected",()=>{
     
    //     console.log("DB connected")

    // })
}
