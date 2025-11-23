// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/Mirage.sol";

contract MirageCoinTest is Test {
  MirageCoin mirageCoin;
   function setUp() public{
    mirageCoin =new MirageCoin(address(this)) ;
  }
  function testInitialSupply() public{
    assertEq(mirageCoin.totalSupply(),0 );
  }
}
