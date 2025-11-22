// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; 
import "@openzeppelin/contracts/access/Ownable.sol";
contract StorageProxy is Ownable {
    // address owner ; 
    uint public num;
    address implementation;

    constructor (address _implementation) Ownable(msg.sender) {
        // owner = msg.sender;
        num =0 ;
        implementation = _implementation;
    }
    function SetNum (uint _num )public {
        (bool success,) =implementation.delegatecall(
            abi.encodeWithSignature("SetNum(uint256)", _num)
        );
        require(success,"Error while delegating call");
    }
    function setImplementaiton(address _implementation) public onlyOwner {
        // require(msg.sender==owner);
        implementation = _implementation;
    }
} 


contract Implementation{
    address public  owner;
    uint public num;
    function SetNum(uint _num)public {
        num = _num*2;
    }
}

contract Implementation2{
        address public  owner;

    uint public  num;
    function SetNum(uint _num) public  {
        num = _num*3;
    }
}

contract Implementation3{
        address public  owner;

    uint public  num;
    function SetNum (uint _num) public {
        num = _num*5;
    }
}


// storage proxy problem because in this slot 0 has something diff contract StorageProxy is Ownable so we are adding  a dummy thing        address public  owner so this is at 0th position so      uint public  num; this is at the 1st slot in both thing 
