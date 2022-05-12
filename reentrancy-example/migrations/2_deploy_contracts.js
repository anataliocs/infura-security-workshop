var Etherbank = artifacts.require("Etherbank");
var Attacker = artifacts.require("Attacker");
var EtherbankUpdated = artifacts.require("EtherbankUpdated");

module.exports = function(deployer) {

  deployer.deploy(Etherbank).then(function() {
    return deployer.deploy(Attacker, Etherbank.address);
  });
  deployer.deploy(EtherbankUpdated);
};
