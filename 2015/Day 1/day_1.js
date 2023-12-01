const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const inputs = input.split("");

let floor = 0;
let basement = 0;

inputs.forEach((input, index) => {
  if (input === "(") {
    floor++;
  } else if (input === ")") {
    floor--;
  }
  if (floor === -1 && basement === 0) {
    basement = index + 1;
  }
});

console.log(basement);
