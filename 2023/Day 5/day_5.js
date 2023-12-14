const fs = require("fs");
const { get } = require("http");

const input = fs.readFileSync("input.txt", "utf8");

const inputArray = input.split("\n");

const numberStringWithSpacesToNumberArray = (numberString) => {
  return numberString.trim().split(" ").map(Number);
};

const getSeeds = (seedRow) => {
  const [seedTitle, seedNumberString] = seedRow.split(":");
  const seeds = numberStringWithSpacesToNumberArray(seedNumberString);
  return seeds;
};

const formatMaps = (inputArray) => {
  let maps = [];
  let mapData = {
    title: "",
    maps: [],
  };
  [...inputArray, ""].forEach((row, index) => {
    if (index === 0 || index === 1) return;
    if (row === "") {
      maps = [...maps, mapData];
      mapData = {
        title: "",
        maps: [],
      };
    } else {
      if (row[row.length - 1] === ":") {
        mapData.title = row;
      } else {
        const formattedRow = numberStringWithSpacesToNumberArray(row);
        mapData.maps = [...mapData.maps, formattedRow];
      }
    }
  });
  return maps;
};

const seeds = getSeeds(inputArray[0]);
const maps = formatMaps(inputArray);

console.log(seeds);
console.log(maps);

const getMapAnswers = (maps, seeds) => {
  let answers = [];

  return answers;
};

const answers = getMapAnswers(maps, seeds);

console.log(answers);
