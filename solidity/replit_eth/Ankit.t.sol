// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/Ankit.sol";

contract TestKitCoin is Test {
    event Transfer(address indexed from , address indexed to , uint256 value); 
    KIT c;
   function setUp() public {
        c = new KIT(0);
    }
    function testMint() public {
    c.mint(address(this),100);
    assertEq(c.balanceOf(address(this)),100,"ok");
    assertEq(c.balanceOf(0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8), 0,"ok");
    c.mint(0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8,200);
    assertEq(c.balanceOf(0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8), 200,"ok");
    
    }
    function testTransfer() public{
    c.mint(address(this), 100);
    c.transfer(0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8, 50);
    assertEq(c.balanceOf(0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8), 50,"ok");
    vm.prank(0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8);
    c.transfer(address(this), 50);
    assertEq(c.balanceOf(address(this)),100,"ok");
    }
    function testTransferEmit() public {
        c.mint(address(this),100);
         vm.expectEmit(true,true,false,true);
        //  first true => c.transfer is being compared to the emit transfer's first address(this)
        //  second true => event 0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8 this is being compared 
        // third is false because we dont have the third field data is not their that why this is ignored 
        // fourth true is for the data is being compared i.e 10 balance 
         emit Transfer(address(this),0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8,10);
        //  i am telling this to compiler this is going to happen c.transfer event is going to make this this is just we are telling this 
         c.transfer(0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8,10);
    };
    function test_ExpectEmitApprove() public {
        token.mint (address (this), 100);
        vm. expectEmit(true, true, false, true);
        emit Approval(address(this), 0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8,100);
        token.approve(0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8,100);
        vm.prank(0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8)
        token.transferFrom(0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8,address(this),100)
//  token.transferFrom(0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8,address(this),100) 
// keep ur eyes on the from => to 
}