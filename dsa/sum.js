let a = 123 ;
let sum = 0 ; 
while (a>0) {
    let temp = a%10;
    sum = sum +temp;
    a=a/10;
}
console.log(sum)