const fs=require('node:fs');
fs.writeFile("example.txt","hello world",(err)=>{
if(err){
    return console.log('file written');
}
fs.readFile('example.txt', 'utf-8',(err,data)=>{
    if(err){
       return console.log(err)
    }
    console.log("data from read file ",data)
})
})
const buf = new Buffer(1028);
fs.open('example.txt','r+',(err,fd)=>{
    if(err){
        return console.log(err)
     }
     console.log("file opened");

     fs.read(fd,buf,0,buf.length,0,(err,bytes)=>{
        if(err){
            return console.log(err);
         }
         if(bytes>0){
            console.log("data read from fs.read before truncate", buf.slice(0, bytes).toString());
         }
         
     })
     fs.truncate(fd,10,(err)=>{
        if(err){
            return console.log(err);
         }
     })
     fs.read(fd,buf,0,buf.length,0,(err,bytes)=>{
        if(err){
            return console.log(err);
         }
         if(bytes>0){
            console.log("data read from fs.read after truncate", buf.slice(0, bytes).toString());
         }
     })
     fs.close(fd,(err)=>{
        if(err){
            return console.log(err)
        }
        console.log("file closed successfully")
     })
})

