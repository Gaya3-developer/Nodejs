const fs = require('fs');

// const buf = new Buffer(1028)
// fs.mkdirSync('thapa')

// fs.writeFileSync('./thapa/bio.txt','hello world')

// fs.writeFile('./thapa/bio.txt','hello world',{
//     flag:"a"
// },(err)=>{
//     if(err){
//         return console.log(err)
//     }
//     console.log('file written')
// })
fs.appendFileSync('./thapa/bio.txt','welcome 123')
const data = fs.readFileSync('./thapa/bio.txt','utf-8')
console.log(data)

 fs.renameSync('./thapa/bio.txt','./thapa/mybio.txt')
 
 fs.unlinkSync('./thapa/mybio.txt');  

 fs.rmdirSync('./thapa');  
