// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; 

contract stackingContract{
    mapping (address => uint ) public  stakes; 
    uint public  totalStakes ; 
    event Staked (address indexed user , uint amount);
    event Unstaked (address indexed  user ,uint amount);
    constructor(){}
    function stake()public  payable {
        require(msg.value>0,"Amount must be > 0");
        stakes[msg.sender] += msg.value;
        totalStakes+= msg.value;
        emit Staked(msg.sender, msg.value);
    }
    // function unstake(uint )public {}
}