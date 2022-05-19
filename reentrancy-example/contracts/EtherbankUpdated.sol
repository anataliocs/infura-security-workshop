pragma solidity ^0.4.19;

// Updated contract to protect against re-entrancy attack

contract EtherbankUpdated {
    mapping(address => uint256) public balances;

    function initialDeposit(address to) public {
        balances[to] += 10 ether;
    }

    function deposit(address to) public payable {
        balances[to] += msg.value;
    }

    function withdraw(uint256 amount) public {
        if (balances[msg.sender] >= amount) {
            require(msg.sender.call.value(amount)());
            balances[msg.sender] -= amount;
        }
    }

    function() public payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance(address addr) public view returns (uint256) {
        return balances[addr];
    }
}
