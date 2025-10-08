// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Voter {
        string name;
        string votedParty;
        bool hasVoted;
    }
    struct Party {
        string name;
        uint voteCount;
    }
    address public admin;
    mapping(address => Voter) public voters;
    Party[] public parties;
    constructor(string[] memory _partyNames) {
        admin = msg.sender;
        for (uint i = 0; i < _partyNames.length; i++) {
            parties.push(Party({name: _partyNames[i], voteCount: 0}));
        }
    }
    function registerVoter(string memory _name) public {
        require(bytes(voters[msg.sender].name).length == 0, "Already registered!");
        voters[msg.sender].name = _name;
        voters[msg.sender].hasVoted = false;
    }
    function vote(uint _partyIndex) public {
        Voter storage sender = voters[msg.sender];
        require(bytes(sender.name).length > 0, "You must register first!");
        require(!sender.hasVoted, "Already voted!");
        require(_partyIndex < parties.length, "Invalid party!");

        sender.votedParty = parties[_partyIndex].name;
        sender.hasVoted = true;
        parties[_partyIndex].voteCount += 1;
    }

    function getPartyCount() public view returns (uint) {
        return parties.length;
    }
    function getParty(uint index) public view returns (string memory, uint) {
        require(index < parties.length, "Invalid index!");
        Party storage p = parties[index];
        return (p.name, p.voteCount);
    }
    function getVoter(address _voter) public view returns (string memory, string memory, bool) {
        Voter storage v = voters[_voter];
        return (v.name, v.votedParty, v.hasVoted);
    }
}