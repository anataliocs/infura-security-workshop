App = {
  web3Provider: null,
  contracts: {},

  init: async function () {

    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });;
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {

    $.getJSON('Attacker.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var AttackerArtifact = data;
      App.contracts.Attacker = TruffleContract(AttackerArtifact);

      // Set the provider for our contract
      App.contracts.Attacker.setProvider(App.web3Provider);

    });

    $.getJSON('Etherbank.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var EtherbankArtifact = data;
      App.contracts.Etherbank = TruffleContract(EtherbankArtifact);

      // Set the provider for our contract
      App.contracts.Etherbank.setProvider(App.web3Provider);

    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-attack', App.attack);
    $(document).on('click', '.btn-deposit', App.deposit);
  },

  getDeposit: async function (account) {
    var etherbankInstance = await App.contracts.Etherbank.deployed();
    var attackerInstance = await App.contracts.Attacker.deployed();
    var balance = await etherbankInstance.getBalance(attackerInstance.address, { from: account });

    return balance;
  },

  updateUI: function (balance) {
    $('.attacker-balance').text(balance);
    console.log("Balance: " + balance);
  },

  deposit: async function (event) {
    console.log("Deposit clicked");

    var attackerInstance;

    web3.eth.getAccounts(async function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      var etherbankInstance = await App.contracts.Etherbank.deployed();
      var attackerInstance = await App.contracts.Attacker.deployed();

      console.log("Attacker address: " + attackerInstance.address);
      var balance = await App.getDeposit(account);
      App.updateUI(balance);

      let result = await attackerInstance.deposit({ from: account, gasPrice: 20000000000, gas: 6721975, value: 10 });
      console.log("Deposit in progress");
      balance = await App.getDeposit(account);
      App.updateUI(balance);
    });
  },

  attack: async function (event) {
    console.log("Attack clicked");

    web3.eth.getAccounts(async function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      var etherbankInstance = await App.contracts.Etherbank.deployed();
      var attackerInstance = await App.contracts.Attacker.deployed();

      console.log("Attacker address: " + attackerInstance.address);
      attackerInstance.attack({ from: account });

      console.log("Attack in progress");
      balance = await App.getDeposit(account, { from: account, gasPrice: 20000000000, gas: 6721975 });
      App.updateUI(balance);
    });
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
