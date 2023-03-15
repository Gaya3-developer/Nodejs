const fs = require('fs');

const buf = new Buffer(1028)
fs.mkdir('thapa',(err)=>{
    if(err){
        return console.log(err)
    }
})

fs.writeFile('./thapa/bio.txt','hello world',(err)=>{
    if(err){
        return console.log(err)
    }
    console.log('file written')
})

fs.writeFile('./thapa/bio.txt','hello world',{
    flag:"a"
},(err)=>{
    if(err){
        return console.log(err)
    }
    console.log('file written')
})
fs.appendFile('./thapa/bio.txt','welcome 123',(err)=>{
    if(err){
        return console.log(err)
    }
    console.log('file written')
})
fs.open('./thapa/bio.txt','r+',(err,fd)=>{
    if(err){
        return console.log(err)
    }
    console.log('file opened')
    fs.readFile('./thapa/bio.txt','utf-8',(err,data)=>{
        if(err){
            return console.log(err)
        }
        console.log(data)
    }) 

    fs.read(fd,buf,0,buf.length,10,(err,bytes)=>{
        if (err){
            console.log(err);
         }
         console.log(bytes + " bytes read");
         
         // Print only read bytes to avoid junk.
         if(bytes > 0){
            console.log(buf.slice(0, bytes).toString());
         }
    })
})

fs.rename('./thapa/bio.txt','./thapa/mybio.txt',(err)=>{
    if(err){
        return console.log(err)
    }
})
 
fs.unlink('./thapa/mybio.txt',function(err){
    if(err) return console.log(err);
    console.log('file deleted successfully');
});  

fs.rmdir('./thapa',function(err){
    if(err) return console.log(err);
    console.log('folder deleted successfully');
});  
