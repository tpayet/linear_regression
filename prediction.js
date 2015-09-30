"use strict";

var fs = require('fs'); //File system
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (process.argv[2]) {
	console.log("usage: node prediction.js, no args needed");
	process.exit(9);
}

var t0 = 0;
if (fs.existsSync('theta0.log')) {
	t0 = fs.readFileSync('theta0.log')
}

var t1 = 0;
if (fs.existsSync('theta1.log')) {
	t1 = fs.readFileSync('theta1.log');
}

rl.question("What is the milage of your car ?\n", function(answer) {
  if (answer < 0) {
  	console.log("Nope");
  }
  else {
  	answer = parseFloat(t0) + parseFloat(answer) * parseFloat(t1);
  	if (answer < 0)
  		answer = 0;
  	console.log("The estimated price is : ", answer);
  } 
  

  rl.close();
});