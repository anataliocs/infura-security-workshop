var dex = artifacts.require("Dex");
var attacker = artifacts.require("Attacker");

module.exports = async function(deployer) {

  deployer.deploy(dex).then(async function() {
    return deployer.deploy(attacker, dex.address);
  });
};
