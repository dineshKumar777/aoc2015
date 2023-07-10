import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.trim().split("\n");

const evalLine = (input: string): string => {
  let encodedString = '"';
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\\" || input[i] === '"') {
      encodedString += "\\" + input[i];
    } else {
      encodedString += input[i];
    }
  }
  encodedString += '"';
  return encodedString;
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  let codeLength = 0;
  let memoryLength = 0;

  for (const line of lines) {
    codeLength += line.length;
    memoryLength += eval(line).length;
    console.log(
      `line: ${line}, eval: ${eval(line)},codelength: ${
        line.length
      }, memoryLength: ${eval(line).length}`,
    );
  }

  return codeLength - memoryLength;
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);

  let codeLength = 0;
  let memoryLength = 0;

  for (const line of lines) {
    codeLength += line.length;
    memoryLength += evalLine(line).length;
    console.log(
      `line: ${line}, evalLine: ${evalLine(line)},codelength: ${
        line.length
      }, memoryLength: ${evalLine(line).length}`,
    );
  }

  return memoryLength - codeLength;
};

run({
  part1: {
    tests: [
      {
        input: `""\n"abc"\n"aaa\\\"aaa"\n"\x27"`,
        expected: 9,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `""\n"abc"\n"aaa\\\"aaa"\n"\x27"`,
        expected: 18,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
