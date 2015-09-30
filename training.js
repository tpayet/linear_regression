 "use strict";

var fs = require('fs'); //File system
var loader = require('csv-load-sync'); //csv to array 

var scale = 0.001;
var learning_rate = 0.15 * scale;
var iterations = 500000;
var limit = 0.00000001;

function gradient_descent (csv, theta) {

	var t0 = theta[0];
	var t1 = theta[1];
	
	for (var n = 0; n < csv.length; n++) {
		csv[n]['km'] *= scale;
		csv[n]['price'] *= scale;
	}

	var tmpt0 = 42;
	var tmpt1 = 42;
	// for (var i = 0; i < iterations; i++) {
	while (Math.abs(tmpt1) > limit || Math.abs(tmpt0) > limit) {
		var sumt0 = 0;
		var sumt1 = 0;

		for (var j = 0; j < csv.length; j++) {
			sumt0 = sumt0 + (t1 * csv[j]['km'] + t0) - csv[j]['price'];
			sumt1 = sumt1 + ((t1 * csv[j]['km'] + t0) - csv[j]['price']) * csv[j]['km'];
		}
		tmpt1 = learning_rate / csv.length * sumt1;
		t1 = t1 - tmpt1;
		tmpt0 = learning_rate / csv.length * sumt0;
		t0 = t0 - tmpt0;
		// console.log(tmpt1, tmpt0);
		// console.log(typeof(t1), t0);
	}
	return ([t0 / scale,t1]);
}

if (process.argv[2] == undefined || process.argv[3] !== undefined) {
	console.log("usage: node training.js __DATA_CSV__");
	process.exit(9);
}

var csv = loader(process.argv[2]);
var theta = [0,0];

console.log('Please wait...');
theta = gradient_descent(csv, theta);
console.log('We find theta_0 = %d, and theta_1 = %d', theta[0], theta[1]);
fs.writeFile('theta0.log', theta[0], 'utf-8');
fs.writeFile('theta1.log', theta[1], 'utf-8');