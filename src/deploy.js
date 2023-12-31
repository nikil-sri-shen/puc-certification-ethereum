const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  "YOUR SECERT PHRASE",
  // remember to change this to your own phrase!
  "YOUR NODE LINK"
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
