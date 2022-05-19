var Etherbank = artifacts.require("Etherbank");
var Attacker = artifacts.require("Attacker");
var EtherbankUpdated = artifacts.require("EtherbankUpdated");

module.exports = async function(deployer) {

  deployer.deploy(Etherbank).then(async function() {
    deployer.deploy(Attacker, Etherbank.address).then(async function(){
      let etherbank = await Etherbank.deployed();
      etherbank.initialDeposit(Attacker.address);
    });
  });
  deployer.deploy(EtherbankUpdated);
};
