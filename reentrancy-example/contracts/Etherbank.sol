pragma solidity ^0.4.19;

// Vulnerable contract

contract Etherbank {
    mapping(address => uint256) public balances;

    function deposit() public payable returns (uint256) {
        balances[msg.sender] += msg.value;
        return balances[msg.sender];
    }

    function withdraw(uint256 amount) public payable {
        require(balances[msg.sender] >= amount);
        msg.sender.call.value(amount)();
        balances[msg.sender] -= amount;
    }

    function() public payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
