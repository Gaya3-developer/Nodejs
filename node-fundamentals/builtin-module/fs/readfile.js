const fs = require("node:fs");

console.log("Example 1");
const fileContents = fs.readFileSync("input.txt", "utf8");
console.log("Synchronous read: " + fileContents.toString());

console.log("Example 2");
fs.readFile("input.txt", "utf8",(err,data)=>{
if(err){
  console.log(err)
}
else{
  console.log("Asynchronous read: " + data.toString());
}
});
