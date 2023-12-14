const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split("\n");

const blocks = lines.map((line) => line.split("x"));

const areas = blocks.map((block) => {
  const l = parseInt(block[0]);
  const w = parseInt(block[1]);
  const h = parseInt(block[2]);

  const side1 = l * w;
  const side2 = w * h;
  const side3 = h * l;

  const area =
    2 * side1 + 2 * side2 + 2 * side3 + Math.min(side1, side2, side3);

  return area;
});

const totalArea = areas.reduce((a, b) => a + b);

console.log(totalArea);

// Part 2

const ribbons = blocks.map((block) => {
  const l = parseInt(block[0]);
  const w = parseInt(block[1]);
  const h = parseInt(block[2]);

  const side1 = l + l + w + w;
  const side2 = w + w + h + h;
  const side3 = h + h + l + l;

  const ribbon = Math.min(side1, side2, side3) + l * w * h;

  return ribbon;
});

const totalRibbon = ribbons.reduce((a, b) => a + b);

console.log(totalRibbon);
