const fs = require("fs");

// const YEAR = 2021;

fs.makedirsSync(`${YEAR}`);

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
  fs.writeFileSync(`Day ${i}/input.txt`, "");
}
