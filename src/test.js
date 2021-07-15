const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
chrome =
  "exit doctor exchange chest aim chief enough income monster canyon include tragic";
firefox =
  "edit swarm method describe dwarf trend inquiry ancient fall scan bid normal";

const provider = new HDWalletProvider(
  chrome,
  "https://rinkeby.infura.io/v3/3f0a170d22394d6bb348c7529ab40409"
);

const web3 = new Web3(Web3.givenProvider);
console.log(web3.eth.getAccounts());