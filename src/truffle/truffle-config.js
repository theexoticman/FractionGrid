const HDWalletProvider = require("@truffle/hdwallet-provider");

infuraRinkebyApi =
  "";
privateKeyRinkeby =
  "";
module.exports = {
  contracts_directory: "./contracts/",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(privateKeyRinkeby, infuraRinkebyApi);
      },
      network_id: 4,
      skipDryRun:true

    },
  },
  compilers: {
    solc: {
      version: "0.8.4",
    }
  }
};
