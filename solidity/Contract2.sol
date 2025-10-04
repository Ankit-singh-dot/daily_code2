
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
interface IContract {
    function getNum() external  view returns (uint);
    function add() external ;
}
contract Construct2{
    constructor(){

    }
    function prxoyAdd () public {
        IContract(0x0498B7c793D7432Cd9dB27fb02fc9cfdBAfA1Fd3).add();
    }
    function proxyGet() public view returns (uint){
        uint value = IContract(0x0498B7c793D7432Cd9dB27fb02fc9cfdBAfA1Fd3).getNum();
        return  value;
    }
}
// 0x0498B7c793D7432Cd9dB27fb02fc9cfdBAfA1Fd3