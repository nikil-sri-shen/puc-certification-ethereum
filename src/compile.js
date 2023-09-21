const path = require("path");
const fs = require("fs");
const solc = require("solc");

const pucPath = path.resolve(__dirname, "contracts", "PUC.sol");
const source = fs.readFileSync(pucPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "PUC.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "PUC.sol"
].PUC;
