const fs = require("fs");

// const YEAR = new Date().getFullYear();
const YEAR = 2015;

fs.mkdirSync(`${YEAR}`);

for (let i = 1; i <= 25; i++) {
  fs.mkdirSync(`${YEAR}/Day ${i}`);
  fs.writeFileSync(
    `${YEAR}/Day ${i}/day_${i}.js`,
    `
const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

console.log(input);
`
  );
  fs.writeFileSync(`${YEAR}/Day ${i}/input.txt`, "");
}
