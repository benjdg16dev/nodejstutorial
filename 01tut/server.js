// #3 Global object
console.log(global);

// #4 & #5
// Just a different syntax than what we are used to like import
const os = require("os");
const path = require("path");
// Needs math.js file
// const math = require("./math");
// Desctructuring
const { add, subtract, multiply, divide } = require("./math");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));

// Math
// Before destructuring
// console.log(math.add(2, 3));

// After destructuring
console.log(add(2, 3));
