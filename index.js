// const addFn = require('./add')
// const sum =addFn(1,2)
// console.log('hello from index.js')
// console.log(sum)
// require('./batman')
// require('./superman')

// const sh = require('./superhero')
// console.log(sh.getName())
// const sh1 = require('./superhero')
// sh1.setName('superhero')
// console.log(sh1.getName())
// const sh2 = require('./superhero')
// console.log(sh2.getName()) // print super hero bcz of module caching

const sh = require('./superhero')
const batman = new sh("batman");
console.log(batman.getName())
const sh1 = require('./superhero')
const ssh = new sh1()
ssh.setName('superhero')
console.log(ssh.getName())
const sh2 = require('./superhero')
const as= new sh2("newname");
console.log(as.getName()) // print super hero bcz of module caching