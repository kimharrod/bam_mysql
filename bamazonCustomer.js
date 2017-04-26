// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');
var config = require('./config.js');
var connection = mysql.createConnection(config.config);

// establish connection to the mySql database
connection.connect(function(err) {
	if (err) throw err;
});





connection.end();