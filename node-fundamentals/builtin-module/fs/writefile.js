const fs=require('node:fs');
fs.writeFileSync('./file2.txt','hello world1')

fs.writeFile('./file1.txt','hello world',(err)=>{
    if(err){
        return console.log(err)
    }
    console.log("file data written successfully")
    fs.readFile("./file1.txt","utf-8",(err,data)=>{
        if(err){
            return console.log(err)
        }
        console.log("asynchronous file data read "+data)
    })
})

fs.writeFile('./file3.txt','hello world', {
    flag: "a",
  },(err)=>{
    if(err){
        return console.log(err)
    }
    console.log("file data written successfully")
    fs.readFile("./file3.txt","utf-8",(err,data)=>{
        if(err){
            return console.log(err)
        }
        console.log("asynchronous appended file data read "+data)
    })
})