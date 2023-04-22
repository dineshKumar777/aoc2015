import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return countHouseVisited(input);
};

function countHouseVisited(input: string[]) {
  const houses = new Set<string>();
  let x = 0;
  let y = 0;
  houses.add(`${x},${y}`);

  for (const direction of input) {
    switch (direction) {
      case "^":
        y++;
        break;
      case "v":
        y--;
        break;
      case "<":
        x--;
        break;
      case ">":
        x++;
        break;
      default:
        throw new Error("Invalid direction");
    }
    houses.add(`${x},${y}`);
  }
  return houses.size;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return countHouseVisited2(input);
};

function countHouseVisited2(input: string[]) {
  const houses = new Set<string>();
  let x = 0;
  let y = 0;
  let x2 = 0;
  let y2 = 0;
  houses.add(`${x},${y}`);

  for (let i = 0; i < input.length; i++) {
    const direction = input[i];
    if (i % 2 === 0) {
      switch (direction) {
        case "^":
          y++;
          break;
        case "v":
          y--;
          break;
        case "<":
          x--;
          break;
        case ">":
          x++;
          break;
        default:
          throw new Error("Invalid direction");
      }
      houses.add(`${x},${y}`);
    } else {
      switch (direction) {
        case "^":
          y2++;
          break;
        case "v":
          y2--;
          break;
        case "<":
          x2--;
          break;
        case ">":
          x2++;
          break;
        default:
          throw new Error("Invalid direction");
      }
      houses.add(`${x2},${y2}`);
    }
  }
  return houses.size;
}

run({
  part1: {
    tests: [
      {
        input: `^>v<`,
        expected: 4,
      },
      {
        input: `>`,
        expected: 2,
      },
      {
        input: `^v^v^v^v^v`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `^v`,
        expected: 3,
      },
      {
        input: `^>v<`,
        expected: 3,
      },
      {
        input: `^v^v^v^v^v`,
        expected: 11,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
