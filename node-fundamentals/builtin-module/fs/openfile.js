const fs=require('node:fs');
console.log("Going to open file!");
fs.open('./input.txt','w+',(err,fd)=>{
    if (err) {
        return console.error(err);
     }
     console.log("File opened successfully!");  
})