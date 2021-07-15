import web3 from "./Web3";

class HelloworldSmartContract extends Component {

  constructor(){
    const address = "0x7aEf3A8F3AE1252B678fa800b0580E92243c2d86"; // to be defined
    const abi = []; // add ABI properly.
    console.log(web3.version)    
  }

export default new web3.eth.Contract(abi, address);
