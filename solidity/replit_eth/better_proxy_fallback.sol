// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; 
contract StorageProxy{
    uint public  num;
    address implementation ; 

    constructor (address _implementation){
        implementation = _implementation;
    }
    fallback() external  {
        (bool success , )= implementation.delegatecall(msg.data);
        if(!success){
            revert();
        }
     }
}


contract implemenation {
    uint public num;
    function setNum (uint _num) public {
        num = _num;
    } 
}