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
  	type: 'list',
  	name: 'activity',
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

	  // query database to show all products for sale
	  connection.query("SELECT * FROM products", function(err, res) {
	  if (err) throw err;

	  // code to format console table data
		var heads = ['ID', 'Product', 'Price', 'Inventory'];
		var table = [];
		for (var i = 0; i < res.length; i++) {

			table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
		
		} // end for loop

		console.table(heads, table);

		main();

	  });

	  break;


	  case 'View low inventory' :

	  // query database to show all products with low inventory count
	  connection.query("SELECT * FROM products", function(err, res) {
	  if (err) throw err;

	  var heads = ['ID', 'Product', 'Price', 'Inventory'];
	  var table = [];
	  for (var i = 0; i < res.length; i++) {
	  	if (res[i].stock_quantity < 5){

	  	table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
	
	  	} // end if low inventory

  	   } // end for loop

	   console.table(heads, table);

	   main();

	   }); // end low inventory callback

	  break;


	  case 'Add to inventory' :


	  break;


	  case 'Add new product' :


	  break;


	  case 'Exit' :
	  	connection.end();
	  break;

	  default:
	  	return;


    } // end switch

  }); // end inquirer callback

} // end main function

main();