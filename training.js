"use strict";

var fs = require('fs'); //File system
var loader = require('csv-load-sync'); //csv to array 

if (process.argv[2] == undefined || process.argv[3] !== undefined) {
	console.log("usage: node training.js __DATA_CSV__");
	process.exit(9);
}

function gradient_step(coeff, csv, learning_rate) {
	var	theta_0_gradient = 0.0;
	var theta_1_gradient = 0.0;
	var x = 0.0;
	var y = 0.0;
	var n = csv.length;

	for (var i = 0; i < n; i++) {
		x = csv[i]['km'];
		y = csv[i]['price'];
		theta_0_gradient += -(2/n) * (y - (theta[0] * x) + theta[1]);
		theta_1_gradient += -(2/n) * x * (y - ((theta[0] * x) + theta[1]));
	}
	var new_theta_0 = theta[0] - (learning_rate * theta_0_gradient);
	var new_theta_1 = theta[1] - (learning_rate * theta_1_gradient);
	return ([new_theta_0, new_theta_1]);
}

function gradient_descent(csv, learning_rate, theta, iterations) {
	var coeff = theta;

	for (var i = 0; i < iterations; i++) {
		coeff = gradient_step(coeff, csv, learning_rate);
	}
	return (coeff);
}

var csv = loader(process.argv[2]);
var learning_rate = 0.0000001;
var theta = [0 ,0];
var iterations = 1000;
console.log('Running gradient descent with learning_rate = %d, theta_0 = %d, theta_1 = %d & iterations = %d', learning_rate, theta[0], theta[1], iterations);
console.log('Please wait...');
theta = gradient_descent(csv, learning_rate, theta, iterations);
console.log('We find theta_0 = %d, and theta_1 = %d', theta[0], theta[1]);

console.log(theta);
