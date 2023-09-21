const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../compile");

let puc;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  puc = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "10000000" });
});

describe("PUC Contract", () => {
  it("deploy contract", () => {
    assert.ok(puc.options.address);
  });
});
