pragma solidity ^0.4.19;

// Vulnerable contract

contract EtherBank {
  mapping (address => uint) public balances;
    
  function deposit(address to) payable public {
    balances[to] += msg.value;
  }
    
  function withdraw(uint amount) public {
    require(balances[msg.sender]>= amount);
    msg.sender.call.value(amount)();
    balances[msg.sender] -= amount;
  }  

  function () payable public {
    balances[msg.sender] += msg.value;
  }

  function getBalance(address addr) view public returns(uint){
    return balances[addr];
  }
}
