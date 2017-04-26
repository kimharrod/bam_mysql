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
function main() {
inquirer.prompt([
  {
  	type: 'list',
  	name: 'activity',
  	message: '\nSelect an activity',
  	choices: [
  	  new inquirer.Separator(),
  	  'Purchase a product',
  	  new inquirer.Separator(),
  	  'Exit' 
   	]
  }// end inquirer prompt

// use switch statement to choose a customer activity

]).then(function (answers) {

switch (answers.activity) {

	case 'Purchase a product' :

		connection.query("SELECT * FROM products", function(err, res) {
			// handle any errors
			if (err) throw err;

			// code to format the table in the console
			var heads = ['ID', 'Product', 'Price'];
			var table = [];
			for (var i = 0; i < res.length; i++) {
				table.push([res[i].item_id, res[i].product_name, res[i].price]);
			}

			console.table(heads, table);

			main();

		}); // end connection.query

	break;

	case 'Exit' :

		connection.end();

	break;			

} // end switch

}); // end main inquirer callback

} // end function main

main();



