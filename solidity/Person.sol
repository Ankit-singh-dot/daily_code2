// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Personal{
uint256 number;
address owner;
constructor (){
    owner = msg.sender;
} 
modifier onlyOwner(){
    require(owner == msg.sender);
    _;
}
function add(uint a)public onlyOwner{
number = number+a;
}
function sub(uint a)public onlyOwner{
number = number-a;
}
function getNumber() public view returns (uint) {  
return  number;
}
}