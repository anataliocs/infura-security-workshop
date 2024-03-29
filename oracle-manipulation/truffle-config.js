/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const localURL = `http://127.0.0.1:8545`;
const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    development: {
      provider: () => new HDWalletProvider(mnemonic, localURL),
      network_id: "*" // Match any network id
    }
  },  
  compilers: {
    solc: {
      version: "^0.4.19",
      parser: "solcjs",  // Leverages solc-js purely for speedy parsing
    }
  }
};
