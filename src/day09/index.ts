import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.trim().split("\n");

const part1 = (rawInput: string) => {
  const inputLines = parseInput(rawInput);
  const shortestDistance = getPathDistance(inputLines, true);
  return shortestDistance;
};

const part2 = (rawInput: string) => {
  const inputLines = parseInput(rawInput);
  const shortestDistance = getPathDistance(inputLines, false);
  return shortestDistance;
  return;
};

function getPathDistance(
  inputLines: string[],
  getMinDistance: boolean,
): number {
  const distances: { [key: string]: number } = {};

  for (let line of inputLines) {
    const parts = line.split(" = ");
    const cities = parts[0].split(" to ").sort();
    const distance = parseInt(parts[1], 10);
    distances[cities.join()] = distance;
  }

  // get list of cities
  const cities = Array.from(
    new Set(Object.keys(distances).flatMap((key) => key.split(","))),
  );

  const routes = permute(cities);

  // calculate the total distance for each route and find the minimum or maximum based on requirement
  let minDistance = Infinity;
  let maxDistance = -Infinity;
  let reqDistance = 0;
  for (let route of routes) {
    let distance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      distance += distances[[route[i], route[i + 1]].sort().join()];
    }
    if (getMinDistance) {
      minDistance = Math.min(minDistance, distance);
      reqDistance = minDistance;
    } else {
      maxDistance = Math.max(maxDistance, distance);
      reqDistance = maxDistance;
    }
  }

  return reqDistance;
}

function permute(inputArr: string[]): string[][] {
  let result: string[][] = [];

  const permuteArr = (arr: string[], m: string[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permuteArr(curr.slice(), m.concat(next));
      }
    }
  };

  permuteArr(inputArr);
  return result;
}

run({
  part1: {
    tests: [
      {
        input: `London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141`,
        expected: 605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141`,
        expected: 982,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
