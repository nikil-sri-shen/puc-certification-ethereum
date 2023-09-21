const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  "cigar struggle shoulder voyage mule rebuild brisk churn bunker rough hammer accuse",
  // remember to change this to your own phrase!
  "https://goerli.infura.io/v3/ad3a4a0aaa754d8e8b7d16d3d3318a7a"
  // remember to change this to your own endpoint!
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);
    console.log(await web3.eth.getBalance(accounts[0]));

    const result = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object })
      .send({ gas: "10000000", from: accounts[0] });

    console.log(JSON.stringify(abi));
    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
  } catch (err) {
    console.log(err);
  }
};
deploy();
