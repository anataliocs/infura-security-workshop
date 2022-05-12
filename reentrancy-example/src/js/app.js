App = {
  web3Provider: null,
  contracts: {},

  init: async function() {

    return await App.initWeb3();
  },

  initWeb3: async function() {
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
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {

    $.getJSON('Attacker.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var AttackerArtifact = data;
      App.contracts.Attacker = TruffleContract(AttackerArtifact);
    
      // Set the provider for our contract
      App.contracts.Attacker.setProvider(App.web3Provider);

    });

    $.getJSON('EtherBank.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var EtherBankArtifact = data;
      App.contracts.EtherBank = TruffleContract(EtherBankArtifact);
    
      // Set the provider for our contract
      App.contracts.EtherBank.setProvider(App.web3Provider);

    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-attack', App.attack);
  },

  attack: function(event) {
    console.log("Attack clicked");

    var attackerInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log("error getting accounts")
        console.log(error);
      }

      var account = accounts[0];
    
      App.contracts.EtherBank.deployed().then(function(etherBankInstance) {
        App.contracts.Attacker.deployed().then(function(instance) {
          attackerInstance = instance;

          console.log(attackerInstance);

          return attackerInstance.deposit({from: account, 
            to: attackerInstance.address, gasPrice: 10000000000, gas: 6721975});
        }).then(function(result) {
          console.log("Balance");    
          console.log("Attack in progress");       
          //attackerInstance.attack({from: account});
        }).catch(function(err) {
          console.log(attackerInstance.address);
          console.log(err.message);
        });
    });
  });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
