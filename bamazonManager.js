// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var config = require('./config.js');
var connection = mysql.createConnection(config.config);

// utility package to prettify table output in console
require('console.table');

// establish connection to the mySql database
connection.connect(function(err) {
	if (err) throw err;
});

// main program loop
function main () {
inquirer.prompt([
  {
  	type: 'list';
  	name: 'activity';
  	message: 'Select a management task',
  	choices: [
  	  new inquirer.Separator(),
  	  'View products for sale',
  	  'View low inventory',
  	  'Add to inventory',
  	  'Add new product',
  	  new inquirer.Separator(),
  	  'Exit'
  	]
  }

// use switch statement to choose a management activity
]).then(function (answers) {

	switch (answers.activity) {

	  case 'View products for sale' :


	  break;


	  case 'View low inventory' :


	  break;


	  case 'Add to inventory' :


	  break;


	  case 'Add new product' :


	  break;


	  case 'Exit' :
	  	connection.end();
	  break;

	  default;
	  	return;


    } // end switch

  }); // end inquirer callback

} // end main function

main();