// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract CallStorage{
    constructor(){}
    function setNumTo2(address storageContractAddress) public {
        IStorage(storageContractAddress).setNum(2);
    }
}

contract Storage{
    uint public num;
    constructor(){}
    function setNum(uint _num) public {
        num =_num  ;
    }
}
interface IStorage {
    function setNum(uint _num) external ;
}