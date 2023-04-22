import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const dimensions = parseInput(rawInput);
  let totalWrappingPaper = 0;

  for (const dim of dimensions) {
    const [l, w, h] = dim.split("x").map(Number);

    const surfaceArea = 2 * l * w + 2 * w * h + 2 * h * l;
    const smallestSide = Math.min(l * w, w * h, h * l);

    totalWrappingPaper += surfaceArea + smallestSide;
  }

  return totalWrappingPaper;
};

const part2 = (rawInput: string) => {
  const dimensions = parseInput(rawInput);
  let totalWrappingPaper = 0;

  for (const dim of dimensions) {
    const [l, w, h] = dim.split("x").map(Number);

    const volume = l * w * h;
    const sortedDimensions = [l, w, h].sort((a, b) => a - b);
    const smallestSidePerimeter =
      2 * (sortedDimensions[0] + sortedDimensions[1]);

    totalWrappingPaper += volume + smallestSidePerimeter;
  }

  return totalWrappingPaper;
};

run({
  part1: {
    tests: [
      {
        input: `2x3x4`,
        expected: 58,
      },
      {
        input: `1x1x10`,
        expected: 43,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2x3x4`,
        expected: 34,
      },
      {
        input: `1x1x10`,
        expected: 14,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
