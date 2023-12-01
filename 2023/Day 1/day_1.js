const fs = require("fs");

const STRING_TO_NUMBER = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const numberCharacterToNumber = (char) => {
  if (!isNaN(Number(char))) return Number(char);
  return null;
};

const checkForNumberString = (block, startingIndex) => {
  let numberCheckString = "";

  block.forEach((char, index) => {
    if (index < startingIndex) return;

    if (STRING_TO_NUMBER[numberCheckString]) {
      return;
    }
    numberCheckString += char;
  });

  if (STRING_TO_NUMBER[numberCheckString])
    return STRING_TO_NUMBER[numberCheckString];

  return null;
};

const pullNumbersFromBlock = (block) => {
  let numberBlock = [];

  block.forEach((char, index) => {
    const num = numberCharacterToNumber(char);
    if (num !== null) return numberBlock.push(num);

    const stringToNumber = checkForNumberString(block, index);
    if (stringToNumber !== null) return numberBlock.push(stringToNumber);
  });

  return numberBlock;
};

const blocksToFirstAndLastNumbers = (block) => {
  return Number(`${block[0]}${block[block.length - 1]}`);
};

const input = fs.readFileSync("input.txt", "utf8");

const inputArray = input.split("\n");

const inputArrayWithStringBlocks = inputArray.map((str) => str.split(""));

const inputArrayWithNumberBlocks =
  inputArrayWithStringBlocks.map(pullNumbersFromBlock);

const inputArrayToNumbers = inputArrayWithNumberBlocks.map(
  blocksToFirstAndLastNumbers
);

const answer = inputArrayToNumbers.reduce((a, b) => a + b);

console.log(answer);
