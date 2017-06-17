/**
 * Created by rajin on 6/16/2017.
 */

/*coded only is js and it works in google console*/
/*function to generate a random number*/
x=Math.random();
/*taking input through console from user*/
var y=prompt("enter your choice");
console.log("you have chosen",y);
/* assigning valuse to rock, paper and scissors*/
if(x<0.4) {
    z="paper"
    console.log("computer has choosen paper");
}
else if(0.4<x<0.7){
    z="scissors";
    console.log("computer has choosen scissors");
}
else{
    z="rock";
    console.log("computer has choosen rock");
}
/*printing the result of the game*/
if(y==z) {
    console.log("tie!");
}
else if(y=="rock"){
    console.log("you win!");
}
else if(y=="paper"){
    console.log("you loose!");
}
else{
    console.log("you win!");
}