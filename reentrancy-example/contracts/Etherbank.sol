pragma solidity ^0.4.19;

// Vulnerable contract

contract Etherbank {
    mapping(address => uint256) public balances;

    function initialDeposit(address to) public {
        balances[to] += 10;
    }

    function deposit(address to) public payable {
        balances[to] += msg.value;
    }

    function withdraw(uint256 amount) public payable {
        require(balances[msg.sender] >= amount);
        msg.sender.call.value(amount)();
        balances[msg.sender] -= amount;
    }

    function() public payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance(address addr) public view returns (uint256) {
        return balances[addr];
    }
}
