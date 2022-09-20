pragma solidity ^0.4.19;

import "./Dex.sol";

//Attacking contract

contract Attacker {
    Dex dex;
    bool isAttack = false;

    constructor(address _dex) public {
        dex = Dex(_dex);
    }
}
