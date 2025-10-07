// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleWallet {
    address public owner;
    mapping(address => uint256) public allowance;
    constructor() {
        owner = msg.sender;
    }
    receive() external payable {}
    function setAllowance(address _user, uint256 _amount) public {
        require(msg.sender == owner, "Only owner");
        allowance[_user] = _amount;
    }
    function withdraw(uint256 _amount) public {
        require(allowance[msg.sender] >= _amount, "Not enough allowance");
        require(address(this).balance >= _amount, "Not enough balance");
 allowance[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }


    function getBalance() public view returns (uint256) {
   return address(this).balance;
    }
}