import web3 from "./Web3";
import FNFT from "./truffle/build/contracts/FNFT.json" ;
const address = "0x9DaaCB9741CA39740CAe7188549F148856aF26dD"; // smart contract address deployed
const abi = FNFT.abi; // smart contract api.
console.log(web3.version);
export default new web3.eth.Contract(abi, address);