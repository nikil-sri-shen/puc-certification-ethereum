import web3 from "./web3";

const address = "0x91B42deA6cD22EB627429c1E7fB569dCF9BfF668";

const abi = JSON.parse(
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"inputs":[{"internalType":"string","name":"_userName","type":"string"},{"internalType":"string","name":"_vechileNo","type":"string"},{"internalType":"address","name":"_userAcc","type":"address"},{"internalType":"uint256","name":"_CO","type":"uint256"},{"internalType":"uint256","name":"_NOX","type":"uint256"},{"internalType":"uint256","name":"_HC","type":"uint256"},{"internalType":"string","name":"_issueDate","type":"string"},{"internalType":"bool","name":"_isValid","type":"bool"}],"name":"addCertificate","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x11b6d667"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"}],"name":"certificates","outputs":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"string","name":"vechileNo","type":"string"},{"internalType":"address","name":"userAcc","type":"address"},{"internalType":"uint256","name":"CO","type":"uint256"},{"internalType":"uint256","name":"NOX","type":"uint256"},{"internalType":"uint256","name":"HC","type":"uint256"},{"internalType":"string","name":"issueDate","type":"string"},{"internalType":"bool","name":"isValid","type":"bool"},{"internalType":"bool","name":"isAdded","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x63e7e85b"},{"inputs":[{"internalType":"address","name":"_userAcc","type":"address"},{"internalType":"string","name":"_vechileNo","type":"string"}],"name":"getCertificate","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x26bf0f03"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x8da5cb5b"},{"inputs":[],"name":"sendAmount","outputs":[],"stateMutability":"payable","type":"function","payable":true,"signature":"0x8b2b3d8b"}]'
);

export default new web3.eth.Contract(abi, address);