const script2 = require('./script2.js');

const a = script2.largeNumber;
const b = 5;

console.log(__dirname);

setTimeout(() => {
  console.log(a+b);
}, 3000)
