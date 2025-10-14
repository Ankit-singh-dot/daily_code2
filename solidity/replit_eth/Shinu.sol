// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;
import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";
contract Shinu is ERC20, Ownable { 
    constructor () ERC20("Shinu" , "SHI"){
        owner = msg.sender;
    }
    function mint (address to, uint256 amount) public isOwner{
        require(msg.sender == owner);
        _mint(to , amount);
    }
    function burn (address to ,uint256 amount) public isOwner{
        _burn(to, amount);
    }
}
