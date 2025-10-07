// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ModifierExample {
    address public owner;
    uint public value;

    constructor() {

        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner!");
        _;  
    }
    modifier validNumber(uint _num) {
        require(_num > 0, "Number must be greater than zero!");
        _;  
    }

function setValue(uint _value) public onlyOwner validNumber(_value) {
        value = _value;
    }
    function getValue() public view returns (uint) {
        return value;
    }
function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}