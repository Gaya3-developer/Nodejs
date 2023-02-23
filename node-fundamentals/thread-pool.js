const crypto = require("crypto");
const https = require("https");

 //process.env.UV_THREADPOOL_SIZE = 5;
  //process.env.UV_THREADPOOL_SIZE = 6;
 // process.env.UV_THREADPOOL_SIZE = 8;
 process.env.UV_THREADPOOL_SIZE = 16;
//synchronous execution of code takes long time to run blocking each statement
const start = Date.now();
crypto.pbkdf2Sync("a", "b", 100000, 512, "sha512")
crypto.pbkdf2Sync("a", "b", 100000, 512, "sha512")
crypto.pbkdf2Sync("a", "b", 100000, 512, "sha512")
console.log(`Synchronous blocking Hash`, Date.now() - start);


//asynchronous execution of code running statement parallaly
//const MAX_CALLS = 1; 
//const MAX_CALLS = 3; 
//const MAX_CALLS = 4; 
//const MAX_CALLS = 5; 
//const MAX_CALLS = 6; 
//const MAX_CALLS = 8; 
//const MAX_CALLS = 12; 
const MAX_CALLS = 16; 

// for (let i = 0; i < MAX_CALLS; i++) {
//   crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
//    console.log(`asynchronous blocking Hash: ${i + 1}`, Date.now() - start);
//  });
// }



//asynchronous execution of code in network i/o running statement parallaly
//const MAX_HTTPS_CALLS = 1; 
//const MAX_HTTPS_CALLS = 2; 
//const MAX_HTTPS_CALLS = 4; 
const MAX_HTTPS_CALLS = 12; 
for (let i = 0; i < MAX_HTTPS_CALLS; i++) {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(`Request: ${i + 1}`, Date.now() - start);
      });
    })
    .end();
  }
