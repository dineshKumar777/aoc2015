import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(",");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputSequence = input[0];
  const iterations = Number(input[1]);

  let result = inputSequence;
  for (let i = 0; i < iterations; i++) {
    result = lookAndSayHelper(result);
  }

  return result.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputSequence = input[0];
  const iterations = 50;

  let result = inputSequence;
  for (let i = 0; i < iterations; i++) {
    result = lookAndSayHelper(result);
  }

  return result.length;
};

function lookAndSayHelper(inputSequence: string): string {
  let outputSequence = "";
  let count = 1;

  for (let i = 0; i < inputSequence.length; i++) {
    if (inputSequence[i] === inputSequence[i + 1]) {
      count++;
    } else {
      outputSequence += count + inputSequence[i];
      count = 1;
    }
  }
  return outputSequence;
}

run({
  part1: {
    tests: [
      {
        input: "1,5",
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: "1,5",
      //   expected: 6,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
