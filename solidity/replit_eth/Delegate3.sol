// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; 
contract StorageProxy{
    uint public num;
    address implementation;

    constructor (address _implementation) {
        num =0 ;
        implementation = _implementation;
    }
    function SetNum (uint _num )public {
        (bool success,) =implementation.delegatecall(
            abi.encodeWithSignature("SetNum(uint256)", _num)
        );
        require(success,"Error while delegating call");
    }
    function setImplementaiton(address _implementation) public {
        implementation = _implementation;
    }
} 


contract Implementation{
    uint public num;
    function SetNum(uint _num)public {
        num = _num*2;
    }
}

contract Implementation2{
    uint public  num;
    function SetNum(uint _num) public  {
        num = _num*3;
    }
}

contract Implementation3{
    uint public  num;
    function SetNum (uint _num) public {
        num = _num*5;
    }
}