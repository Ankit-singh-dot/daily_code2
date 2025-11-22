// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; 



contract StakingProxy{
    mapping (address => uint)public  stakes;
       uint public totalStakes;
       address public implementation; 
       address public  owner;
        event Upgraded(address newImplementation);

        constructor(address _implementation){
            implementation = _implementation;
            owner = msg.sender;
        }
        modifier  onlyOwner(){
            require( msg.sender == owner ,"not owner");
            _;
        }
            function upgrade(address newImplementation) public onlyOwner {
                  implementation = newImplementation;
        emit Upgraded(newImplementation);
            }

            fallback() external payable  {
                address impl = implementation;
                  require(impl != address(0), "No implementation");
                  assembly{  calldatacopy(0, 0, calldatasize())

            let result := delegatecall(
                gas(),
                impl,
                0,
                calldatasize(),
                0,
                0
            )
            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
             }
               receive() external payable {}
}
contract stackingContract{
    mapping (address => uint ) public  stakes; 
    uint public  totalStakes ; 
    event Staked (address indexed user , uint amount);
    event Unstaked (address indexed  user ,uint amount);
    constructor(){}
    function stake()public  payable {
        require(msg.value>0,"Amount must be > 0");
        stakes[msg.sender] += msg.value;
        totalStakes+= msg.value;
        emit Staked(msg.sender, msg.value);
    }
    function unstake(uint _amont)public payable  {
        require(_amont>0 ,"Invalid Amount");
        require(stakes[msg.sender]>= _amont , "not enough to stake");
        stakes[msg.sender] -= _amont;
        totalStakes -= _amont; 
        (bool success, ) = payable(msg.sender).call{value:_amont}("");
                require(success, "Transfer failed");
                emit Unstaked(msg.sender, msg.value); 
    }
     function getMyStake() public view returns(uint) {
        return stakes[msg.sender];
    }
}