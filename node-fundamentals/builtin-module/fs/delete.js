const fs = require('node:fs');
fs.writeFile('delete-file.txt',"hello gayathri",(err)=>{
if(err){
    return console.log(err)
}
console.log('file written')
})

fs.unlink('delete-file.txt',(err)=>{
    if(err){
        return console.log(err)
    }
    console.log('file deleted')
    })