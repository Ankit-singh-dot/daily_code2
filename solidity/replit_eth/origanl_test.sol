// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/Mirage.sol";

contract MirageCoinTest is Test {
  MirageCoin mirageCoin;
  address staking = address(this);
  address randomUser = address(0x0e2CAc9696627AB132138B865a8691444CEFC40D);
   function setUp() public{
    mirageCoin =new MirageCoin(staking);
  }
  function testInitialSupply() public{
    assertEq(mirageCoin.totalSupply(),0 );
  }
  function test_RevertWhen_NonStakingContractMints() public {
        vm.startPrank(randomUser);

        vm.expectRevert("not owner");
        mirageCoin.mint(randomUser, 10);

        vm.stopPrank();
    }
    function testMint() public {
        mirageCoin.mint(randomUser, 10);
        assertEq(mirageCoin.balanceOf(randomUser), 10);
    }
}
