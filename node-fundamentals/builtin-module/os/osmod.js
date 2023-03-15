const os = require('node:os');

console.log(os.arch())
console.log(os.type())
console.log(os.freemem()/1024/1024/1024)
console.log(os.totalmem()/1024/1024/1024)
console.log(os.hostname())
console.log(os.tmpdir())
console.log(os.platform())