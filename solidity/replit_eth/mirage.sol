// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MirageCoin is ERC20 { 
        address stakingContract ;
        address owner;
    constructor(address _stakingContract) ERC20("MIRAGE","MIR"){
        stakingContract = _stakingContract;
        owner = msg.sender;
    }
    
    function mint(address account, uint256 value) external {
        require(msg.sender == stakingContract , "not owner");
        super._mint(account, value);
    } 

    function updateStakingContract(address _stakingContract)public {
        require(msg.sender == owner);
        stakingContract = _stakingContract;
    }
}
