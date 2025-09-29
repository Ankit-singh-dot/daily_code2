// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PersonRegistry {
    struct Person {
        string name;
        uint256 age;
        string email;
        address wallet;
    }


    mapping(uint256 => Person) public persons;
    uint256 public personCount;


    event PersonCreated(uint256 id, string name, uint256 age, string email, address wallet);


    function addPerson(string memory _name, uint256 _age, string memory _email) public {
        personCount++;
        persons[personCount] = Person(_name, _age, _email, msg.sender);
        emit PersonCreated(personCount, _name, _age, _email, msg.sender);
    }


    function updateAge(uint256 _id, uint256 _newAge) public {
        require(_id > 0 && _id <= personCount, "Person does not exist");
        require(persons[_id].wallet == msg.sender, "Not authorized");
        persons[_id].age = _newAge;
    }


    function getPerson(uint256 _id) public view returns (string memory, uint256, string memory, address) {
        require(_id > 0 && _id <= personCount, "Person does not exist");
        Person memory p = persons[_id];
        return (p.name, p.age, p.email, p.wallet);
    }
}