const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const inputArray = input.split("\n");

const inputArrayWithGameObjects = inputArray.map((data, index) => {
  const [gameTitle, gameData] = data.split(":");
  const [gameName, gameNumber] = gameTitle.split(" ");
  const games = gameData.split(";");
  const rounds = games.map((round) => {
    const turnTotal = {
      red: 0,
      green: 0,
      blue: 0,
    };
    const turns = round.split(",").map((cube) => cube.trim());

    turns.map((turn) => {
      const [count, color] = turn.split(" ");
      turnTotal[color] = Number(count);
    });

    return turnTotal;
  });
  return {
    game: Number(gameNumber),
    rounds,
  };
});

const CUBES = {
  red: 12,
  green: 13,
  blue: 14,
};

let trueGames = 0;

inputArrayWithGameObjects.forEach(({ game, rounds }) => {
  let gameFailFlag = false;
  rounds.forEach((round) => {
    const { red, green, blue } = round;
    if (red > CUBES.red || green > CUBES.green || blue > CUBES.blue) {
      gameFailFlag = true;
      return;
    }
  });
  if (!gameFailFlag) trueGames += game;
});

let total = 0;

inputArrayWithGameObjects.forEach(({ game, rounds }) => {
  let MIN_CUBES = {
    red: 0,
    green: 0,
    blue: 0,
  };

  rounds.forEach((round) => {
    const { red, green, blue } = round;
    if (red > MIN_CUBES.red) MIN_CUBES.red = red;
    if (green > MIN_CUBES.green) MIN_CUBES.green = green;
    if (blue > MIN_CUBES.blue) MIN_CUBES.blue = blue;
  });

  const { red, green, blue } = MIN_CUBES;
  total += red * green * blue;
});

console.log(total);
