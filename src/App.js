import "./App.css";
import React, { Component } from "react";
import web3 from "./Web3";
import Fnfts from "./FNFT";
import {  message, verify2_json } from "./domain_eip712";

const init = async () => {
  var accounts = await web3.eth.getAccounts();
  return accounts[0];
};
const parseSignature = (signature) => {
  var r = signature.substring(0, 64);
  var s = signature.substring(64, 128);
  var v = signature.substring(128, 130);

  return {
    r: "0x" + r,
    s: "0x" + s,
    v: parseInt(v, 16),
  };
};

class App extends Component {
  state = {
    account: "",
    signature: "",
    sigR: "",
    sigS: "",
    sigV: "",
    verify: "",
    authorized: "",
    calculatedAddress: "",
  };

  async componentDidMount() {
    var account = await init();

    this.setState({ account });
  }
  async encode(param1, param2, param3, param4) {
    const encoded = await web3.eth.abi.encodeFunctionCall(verify2_json, [
      this.state.account,
      this.state.sigR,
      this.state.sigS,
      this.state.sigV,
    ]);
    this.setState({ encoded_call: encoded });
  }

  async verify(event) {
    const verified = await Fnfts.methods
      .verify2(
        this.state.account,
        this.state.sigR,
        this.state.sigS,
        this.state.sigV
      )
      .send({
        from: this.state.account,
        gas: "1000000", // value have to be dynamic.
      });
    var res = verified.events.TransactionVerified.returnValues;

    var verify_json = res.calculatedAddress;
    var verify_json_ver = res.verified;
    this.setState({
      calculatedAddress: verify_json,
    });
    this.setState({
      authorized: verify_json_ver,
    });
    this.setState({ verify: res });

    return verified;
  }


  signTx = async (event) => {
    const sig = await web3.currentProvider.send("eth_signTypedData_v4", [
      this.state.account,
      message,
    ]);
    const signature = parseSignature(sig.result.substring(2));
    this.setState({ signature: sig.result });
    this.setState({ sigR: signature.r, sigS: signature.s, sigV: signature.v });
  };

  render() {
    return (
      <div>
        <h2>ERC 712 Demo</h2>
        <p> Sign a transaction before verifying it</p>
        <ul>
          <hr />
          <li>
            <h3>
              Sign tx
              <button onClick={async () => await this.signTx()}>Sign</button>
            </h3>
          </li>
          <hr />
          <li>Input data: </li>
          <p>{message}</p>

          <li>Metamask Wallet : </li>
          <p>{this.state.account}</p>
          <hr />
          <li>Signature: {this.state.signature}</li>
          <p>
            <b>Eliptic curve Parameters</b>
          </p>
          <li> SigR: {this.state.sigR}</li>
          <li>SigS: {this.state.sigS}</li>
          <li>SigV: {this.state.sigV}</li>
          <hr />

          <li>
            <h3>
              Encode
              <button
                disabled={!this.state.sigR}
                onClick={async () => await this.encode()}
              >
                Encode
              </button>
            </h3>
          </li>
          <hr />
          <p>ABI Encoded call: {this.state.encoded_call}</p>
          <hr />
          <li>
            <h3>
              Verify
              <button
                disabled={!this.state.sigR}
                onClick={async () => await this.verify()}
              >
                Verify
              </button>
            </h3>
          </li>
          <hr />
          <p>Actual Signer: {this.state.account}</p>
          <p>Calculated Signer: {this.state.calculatedAddress}</p>
          <p>Are they the same user? :{this.state.authorized.toString()}</p>
        </ul>
        <hr />
      </div>
    );
  }
}

export default App;
