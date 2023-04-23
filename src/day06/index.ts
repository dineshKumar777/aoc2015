import run from "aocrunner";
type Command = {
  action: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
const parseInput = (rawInput: string) => rawInput.split("\n");

const parseCommand = (command: string): Command => {
  const parts = command.split(" ");
  const action = parts[0] === "turn" ? parts[1] : parts[0];
  const [x1, y1] = parts[action === "toggle" ? 1 : 2].split(",").map(Number);
  const [x2, y2] = parts[action === "toggle" ? 3 : 4].split(",").map(Number);
  return { action, x1, y1, x2, y2 };
};

const executePart2Command = (lights: number[][], command: Command) => {
  const { action, x1, y1, x2, y2 } = command;
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      switch (action) {
        case "on":
          lights[x][y] += 1;
          break;
        case "off":
          lights[x][y] = Math.max(lights[x][y] - 1, 0);
          break;
        case "toggle":
          lights[x][y] += 2;
          break;
      }
    }
  }
};

const executeCommand = (lights: boolean[][], command: Command) => {
  const { action, x1, y1, x2, y2 } = command;
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      switch (action) {
        case "on":
          lights[x][y] = true;
          break;
        case "off":
          lights[x][y] = false;
          break;
        case "toggle":
          lights[x][y] = !lights[x][y];
          break;
      }
    }
  }
};

const countLights = (lights: boolean[][]) => {
  let count = 0;
  for (let x = 0; x < lights.length; x++) {
    for (let y = 0; y < lights[x].length; y++) {
      if (lights[x][y]) {
        count++;
      }
    }
  }
  return count;
};

const part1 = (rawInput: string) => {
  const instructions = parseInput(rawInput);
  const lights = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => false),
  );

  for (const instruction of instructions) {
    const command = parseCommand(instruction);
    executeCommand(lights, command);
  }

  return countLights(lights);
};

const part2 = (rawInput: string) => {
  const instructions = parseInput(rawInput);

  const lights = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0),
  );

  for (const instruction of instructions) {
    const command = parseCommand(instruction);
    executePart2Command(lights, command);
  }

  const totalBrightness = lights.flat().reduce((a, b) => a + b, 0);

  return totalBrightness;
};

run({
  part1: {
    tests: [
      {
        input: `turn on 0,0 through 999,999\ntoggle 0,0 through 999,0\nturn off 499,499 through 500,500`,
        expected: 998996,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `turn on 0,0 through 0,0`,
        expected: 1,
      },
      {
        input: `toggle 0,0 through 999,999`,
        expected: 2000000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
