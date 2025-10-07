// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Will {
    uint startTime ;
    uint public lastVisited ;
    uint tenYears ; 
    address Owner;
    address payable  recipient;
    constructor(address payable   _recipient){
        tenYears = 1 hours * 24 * 365 * 10;
        startTime = block.timestamp;
        lastVisited = block.timestamp;
        Owner = msg.sender;
        recipient = _recipient;  
    }
    modifier onlyOwner (){
        require(msg.sender == Owner);
        _;
    }
    modifier  onlyRecipient(){
        require(msg.sender == recipient);
        _;
    }
    function deposit ()public  payable onlyOwner {
        lastVisited = block.timestamp;
    }
    function ping () public  onlyOwner{
        lastVisited = block.timestamp;
    }
    function claim() external onlyRecipient{
        require(lastVisited < block.timestamp - tenYears);
        payable (recipient).transfer(address(this).balance);
    }

} 