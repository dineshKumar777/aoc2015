import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (
      hasVowels(input[i]) &&
      hasRepeatedLetter(input[i]) &&
      !hasforbiddenSubstring(input[i])
    ) {
      count++;
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (
      hasRepeatedLetterPart2(input[i]) &&
      hasRepeatedPairsWithoutOverlap(input[i])
    ) {
      count++;
    }
  }

  return count;
};

function hasRepeatedLetter(input: string): boolean {
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] === input[i + 1]) {
      return true;
    }
  }
  return false;
}

function hasRepeatedLetterPart2(input: string): boolean {
  for (let i = 0; i < input.length - 2; i++) {
    if (input[i] === input[i + 2]) {
      return true;
    }
  }
  return false;
}

function hasRepeatedPairsWithoutOverlap(input: string): boolean {
  for (let i = 0; i < input.length - 3; i++) {
    const pair = input.slice(i, i + 2);
    const rest = input.slice(i + 2);
    if (rest.includes(pair)) {
      return true;
    }
  }
  return false;
}

function hasVowels(input: string): boolean {
  const vowels = ["a", "e", "i", "o", "u"];
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (vowels.includes(input[i])) {
      count++;
    }
  }
  return count >= 3;
}

function hasforbiddenSubstring(input: string): boolean {
  const forbiddenSubstrings = ["ab", "cd", "pq", "xy"];
  for (let i = 0; i < forbiddenSubstrings.length; i++) {
    if (input.includes(forbiddenSubstrings[i])) {
      return true;
    }
  }
  return false;
}

run({
  part1: {
    tests: [
      {
        input: `ugknbfddgicrmopn`,
        expected: 1, // nice
      },
      {
        input: `aaa`,
        expected: 1, // nice
      },
      {
        input: `jchzalrnumimnmhp`,
        expected: 0, // naughty
      },
      {
        input: `haegwjzuvuyypxyu`,
        expected: 0, // naughty
      },
      {
        input: `dvszwmarrgswjxmb`,
        expected: 0, // naughty
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `qjhvhtzxzqqjkmpb`,
        expected: 1, // nice
      },
      {
        input: `xxyxx`,
        expected: 1, // nice
      },
      {
        input: `uurcxstgmygtbstg`,
        expected: 0, // naughty
      },
      {
        input: `ieodomkazucvgmuy`,
        expected: 0, // naughty
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
