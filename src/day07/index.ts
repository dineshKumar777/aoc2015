import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");
const COMMAND_REGEX = /[A-Z]+/g;
const ARGUMENTS_REGEX = /[a-z0-9]+/g;
const BITWISE_METHODS = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  NOT: (a) => ~a,
  LSHIFT: (a, b) => a << b,
  RSHIFT: (a, b) => a >> b,
};
const WIRES = new Map();

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  input.forEach((instruction) => {
    const parsedInstruction = parseInstruction(instruction);

    WIRES.set(parsedInstruction.destination, {
      command: parsedInstruction.command,
      args: parsedInstruction.args,
    });
  });

  return calculateWire("a");
};

const parseInstruction = (instruction: string) => {
  const command = instruction.match(COMMAND_REGEX);
  const args = instruction.match(ARGUMENTS_REGEX);
  const destination = args.pop();

  return {
    command: command && command[0],
    args: args.map((arg) => (isNaN(Number(arg)) ? arg : Number(arg))),
    destination: destination,
  };
};

const calculateWire = (wireName: string) => {
  const wire = WIRES.get(wireName);
  console.log(wireName, wire);

  // if wire is already calculated, return it
  if (typeof wireName === "number") return wireName;
  if (typeof wire === "number") return wire;
  if (typeof wire === "undefined") return wire;

  if (!wire.command) {
    WIRES.set(wireName, calculateWire(wire.args[0]));
  } else {
    WIRES.set(
      wireName,
      BITWISE_METHODS[wire.command](
        calculateWire(wire.args[0]),
        calculateWire(wire.args[1]),
      ),
    );
  }

  return WIRES.get(wireName);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `123 -> x
      //   456 -> y
      //   x AND y -> d
      //   x OR y -> e
      //   x LSHIFT 2 -> f
      //   y RSHIFT 2 -> g
      //   NOT x -> h
      //   NOT y -> i`,
      //   expected: 65079, // calculating i
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: ,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
