// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
contract Calcultor{
 uint num =  0; 
 constructor(uint _num){
    num = _num;
 }
 function add (uint _value) public {
   num += _value;
 }
 function sub (uint _value) public {
   num -= _value;
 }
 function mul (uint _value) public {
   num = num * _value;
 }
 function div (uint _value) public {
   require(_value != 0,"Vlaue cannot be zero");
   num = num / _value;

 }
 function getValue () public  view returns (uint){
   return num;
 }
}




