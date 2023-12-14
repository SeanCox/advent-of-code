const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const inputArray = input.split("\n");

const cards = inputArray.map((row, index) => {
  const [cardCount, rest] = row.split(":");
  const [winningNumbers, myNumbers] = rest.split("|");

  return {
    cardNumber: index + 1,
    copies: 1,
    winningNumbers: winningNumbers
      .trim()
      .split(" ")
      .filter((x) => x !== ""),
    myNumbers: myNumbers
      .trim()
      .split(" ")
      .filter((x) => x !== ""),
  };
});

// const calculateCard = (card) => {
//   let cardScore = 0;

//   card.winningNumbers.forEach((number) => {
//     if (card.myNumbers.includes(number)) {
//       if (cardScore === 0) {
//         cardScore = 1;
//       } else {
//         cardScore *= 2;
//       }
//     }
//   });

//   return cardScore;
// };

// console.log(cards.map((card) => calculateCard(card)).reduce((a, b) => a + b));

const calculateCard = (card, index) => {
  for (let i = 0; i < card.copies; i++) {
    let cardScore = 0;
    card.winningNumbers.forEach((number, index) => {
      if (card.myNumbers.includes(number)) {
        cardScore += 1;
      }
    });
    for (let j = 1; j <= cardScore; j++) {
      cards[index + j] && (cards[index + j].copies += 1);
    }
  }

  return card.copies;
};

console.log(
  cards.map((card, index) => calculateCard(card, index)).reduce((a, b) => a + b)
);
