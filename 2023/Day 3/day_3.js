const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const inputArray = input.split("\n");
const inputMatrix = inputArray.map((row) => row.split(""));

const symbols = ["@", "#", "$", "%", "&", "*", "-", "+", "=", "\\", "/"];
const numberStrings = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const blankSpace = ".";

const findNumbers = (line) => {
  let numbers = [];
  let numberIndexes = {
    start: null,
    end: null,
  };
  let inNumberFlag = false;

  line.forEach((symbol, index) => {
    if (numberStrings.includes(symbol)) {
      if (inNumberFlag === false) {
        numberIndexes.start = index;
        inNumberFlag = true;
      }
    } else {
      if (inNumberFlag === true) {
        numberIndexes.end = index - 1;
        inNumberFlag = false;
        numbers.push({ ...numberIndexes });
        numberIndexes.start = null;
        numberIndexes.end = null;
      }
    }
  });

  if (inNumberFlag === true) {
    numberIndexes.end = line.length - 1;
    numbers.push({ ...numberIndexes });
  }

  return numbers;
};

const findAllPartNumbers = (matrix) => {
  let partNumbers = [];

  matrix.forEach((line, index) => {
    partNumbers.push(findNumbers(line));
  });

  return partNumbers;
};

const numberLocations = findAllPartNumbers(inputMatrix);

const workingParts = [];

numberLocations.forEach((line, index) => {
  line.forEach((numberLocation) => {
    let isValidNumber = false;
    // check above
    if (index !== 0) {
      for (let i = numberLocation.start - 1; i <= numberLocation.end + 1; i++) {
        if (symbols.includes(inputMatrix[index - 1][i])) {
          isValidNumber = true;
        }
      }
    }
    //check left
    if (numberLocation.start !== 0) {
      if (symbols.includes(inputMatrix[index][numberLocation.start - 1])) {
        isValidNumber = true;
      }
    }
    //check right
    if (numberLocation.end !== inputMatrix[index].length - 1) {
      if (symbols.includes(inputMatrix[index][numberLocation.end + 1])) {
        isValidNumber = true;
      }
    }
    //check below
    if (index !== inputMatrix.length - 1) {
      // this needs to check corners
      for (let i = numberLocation.start - 1; i <= numberLocation.end + 1; i++) {
        if (symbols.includes(inputMatrix[index + 1][i])) {
          isValidNumber = true;
        }
      }
    }

    if (isValidNumber) {
      let number = "";
      for (let i = numberLocation.start; i <= numberLocation.end; i++) {
        number += inputMatrix[index][i];
      }
      workingParts.push(Number(number));
    }
  });
});

// console.log(workingParts.reduce((a, b) => a + b, 0));

let secondAnswer = 0;

let toMultiply = [];

inputMatrix.forEach((line, lineIndex) => {
  line.forEach((symbol, symbolIndex) => {
    if (symbol === "*") {
      // check line
      // numberLocations[lineIndex].forEach((numberLocation) => {
      //   if (
      //     symbolIndex >= numberLocation.start &&
      //     symbolIndex <= numberLocation.end
      //   ) {
      //     toMultiply.push(
      //       line.slice(numberLocation.start, numberLocation.end + 1)
      //     );
      //   }
      // });
      // check line above
      if (lineIndex > 0) {
        numberLocations[lineIndex - 1].forEach((numberLocation) => {
          if (
            symbolIndex >= numberLocation.start - 1 &&
            symbolIndex <= numberLocation.end + 1
          ) {
            toMultiply.push(
              inputMatrix[lineIndex - 1].slice(
                numberLocation.start,
                numberLocation.end + 1
              )
            );
          }
        });
      }
      // check line below
      if (lineIndex < inputMatrix.length - 1) {
        numberLocations[lineIndex + 1].forEach((numberLocation) => {
          if (
            symbolIndex >= numberLocation.start - 1 &&
            symbolIndex <= numberLocation.end + 1
          ) {
            toMultiply.push(
              inputMatrix[lineIndex + 1].slice(
                numberLocation.start,
                numberLocation.end + 1
              )
            );
          }
        });
      }

      // check left
      if (symbolIndex > 0) {
        numberLocations[lineIndex].forEach((numberLocation) => {
          if (
            symbolIndex - 1 >= numberLocation.start &&
            symbolIndex - 1 <= numberLocation.end
          ) {
            toMultiply.push(
              line.slice(numberLocation.start, numberLocation.end + 1)
            );
          }
        });
      }

      // check right
      if (symbolIndex < line.length - 1) {
        numberLocations[lineIndex].forEach((numberLocation) => {
          if (
            symbolIndex + 1 >= numberLocation.start &&
            symbolIndex + 1 <= numberLocation.end
          ) {
            toMultiply.push(
              line.slice(numberLocation.start, numberLocation.end + 1)
            );
          }
        });
      }
    }
    if (toMultiply.length > 1) {
      toMultiply = toMultiply.map((line) => Number(line.join("")));
      secondAnswer += toMultiply[0] * toMultiply[1];
    }
    toMultiply = [];
  });
});

console.log(secondAnswer);
