// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract BerryToken{
   address public owner;
   mapping (address => uint) public balances;
   uint public totalSupply; 
   constructor() {
    owner = msg.sender;
   }
   modifier onlyOwner (){
    require(owner == msg.sender);
    _;
   }
   function mint( uint amount) public onlyOwner{
       balances[owner] += amount;
       totalSupply += amount;
   }
   function mintTo(uint amount, address to) public onlyOwner {
balances[to] += amount;
totalSupply += amount;

   }
   function transfer(address to, uint amount) public{
    uint existingBalance = balances[msg.sender];
    require(existingBalance>=amount);
       balances[msg.sender] -= amount;
       balances[to] += amount;
   }
//    function burn(address to, uint amount) public onlyOwner{
//        balances[to] -= amount;
//    }
    
}