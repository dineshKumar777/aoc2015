import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let currentFloor = processFloor(input);
  return currentFloor.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let basementIndex = processFloor(input, true);
  return basementIndex.toString();
};

const processFloor = (floorInput: string, findBasementPos: boolean = false) => {
  const floors: string[] = floorInput.split("");
  let currentFloor = 0;

  for (const [index, floor] of floors.entries()) {
    if (floor === "(") {
      currentFloor++;
    } else if (floor === ")") {
      currentFloor--;
    } else {
      throw new Error("Invalid floor");
    }

    // flag to only return for part 2
    if (currentFloor === -1 && findBasementPos) {
      return (index + 1).toString();
    }
  }

  return currentFloor.toString();
};

run({
  part1: {
    tests: [
      {
        input: `)())())`,
        expected: "-3",
      },
      {
        input: `(())`,
        expected: "0",
      },
      {
        input: `(()(()(`,
        expected: "3",
      },
      {
        input: `))(`,
        expected: "-1",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `()())`,
        expected: "5",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
