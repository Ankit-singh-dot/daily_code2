
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract ENS {
    mapping (address => string) users;
    constructor (){

    }
    function signUp ( string memory _username) public {
        users[msg.sender] = _username;
    }
    function getUser () public view returns (string memory){
        return users[msg.sender];
    }
}

