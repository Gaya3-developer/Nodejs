const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const path = require("path");


const staticpath = path.join(__dirname,"../public");
require('./db/conn');
//routing
//app.get(path, callback)
app.use("/css", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")))
app.use("/js", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")))
app.use("/jq", express.static(path.join(__dirname,"../node_modules/jquery/dist")))

app.use(express.static(staticpath))
app.get("/",(req,res)=>{
   res.send(" hi i am awsome")  
})

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`)
})