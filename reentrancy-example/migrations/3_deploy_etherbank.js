var etherbank = artifacts.require("Etherbank");
var attacker = artifacts.require("Attacker");

module.exports = async function(deployer) {

  deployer.deploy(etherbank).then(async function() {
    return deployer.deploy(attacker, etherbank.address);
  });
};
