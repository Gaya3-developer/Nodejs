const fs= require('node:fs');
fs.stat('../fs',(err, stats)=>{
    if (err) {
        return console.error(err);
     }
     console.log(stats);
     console.log("Got file info successfully!");
     console.log("isFile ? " + stats.isFile());
     console.log("isDirectory ? " + stats.isDirectory());  
     console.log("isBlockDevice ? " + stats.isBlockDevice());  
     console.log("isCharacterDevice ? " + stats.isCharacterDevice());  
     console.log("isSymbolicLink ? " + stats.isSymbolicLink());  
     console.log("isFIFO ? " + stats.isFIFO());  
     console.log("isSocket ? " + stats.isSocket());  
})