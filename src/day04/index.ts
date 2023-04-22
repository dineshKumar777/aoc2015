import run from "aocrunner";
import * as crypto from "crypto";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return findLowestNumber(input, 5);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return findLowestNumber(input, 6);
};

function findLowestNumber(input: string, leadingZeros: number): number {
  let num = 1;

  while (true) {
    const hash = crypto
      .createHash("md5")
      .update(input + num)
      .digest("hex");
    if (hash.startsWith("0".repeat(leadingZeros))) {
      return num;
    }
    num++;
  }
}

run({
  part1: {
    tests: [
      {
        input: `abcdef`,
        expected: 609043,
      },
      {
        input: `pqrstuv`,
        expected: 1048970,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `ckczppom`,
        expected: 3938038,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
