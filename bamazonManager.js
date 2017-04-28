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

 	  // adding inventory to database
	  case 'Add to inventory' :

	  // first, query database to show all products for sale
	  connection.query("SELECT * FROM products", function(err, res) {
	  if (err) throw err;

	  // format the console table data
		var heads = ['ID', 'Product', 'Department', 'Price', 'Inventory'];
		var table = [];
		for (var i = 0; i < res.length; i++) {

			table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
		
	   } // end for loop

	   console.table(heads, table);

	    // prompt to choose a product ID and quantity to restock 
      	inquirer.prompt([
          {
            name: "item",
            message: "Enter the product ID to restock:"
          }, 
          {
            name: "quantity",
            message: "Enter the quantity to add:"
          }
          ]).then(function(answers) {

          	// for that item, determine how many are currently in inventory
	  		// new variable holds the updated quantity 

            connection.query("SELECT * FROM products", function(err, resp) {
              if (err) throw err;
              var newQty = Number(answers.quantity) + Number(resp[answers.item - 1].stock_quantity);


 				// update the database with the new quantity
               connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newQty
              }, {
                item_id: answers.item
              }], function(err, res) {
                 if (err) throw err;
              });

            main();

           	}); // end connection.query 
      
        }); //end inquirer callback (promise)

      }); // end display product inventory

	  break;

	  // adding a new product to the database
	  case 'Add new product' :

	    inquirer.prompt([
	    {
	    	type: "input",
	    	name: "name",
	    	message: "Enter the product name:"
	    },
	      {
	      	type: "list",
	      	name: "dept",     	
	      	message: "Enter the department:",
	      	choices: ["toys", "gadgets", "crafts"] 	
        },
          { type: "input",
          	name: "price",
            message: "Enter the unit price:"
      	},
      	  {
      	  	type: "input",
      	  	name: "qty",
      	  	message: "Enter the quantity in stock:"
      	}
      	]).then(function(answers) {

  		   // query to assign the next available number to the new product
  		   connection.query("SELECT * FROM products", function(err, res) {
  		   		if (err) throw err;
  		   		var prodId = res.length + 1;

  		   		// insert the new product details into the database
	   			connection.query("INSERT INTO products SET ?", {
	   			  item_id: prodId,
	   			  product_name: answers.name,
	   			  department_name: answers.dept,
	   			  price: answers.price,
	   			  stock_quantity: answers.qty
	   			}, function(err) {
	   			  if (err) throw err;  
	   			
   				main();
	   			
	   			}); // end connection.query to insert table data

   		   }); // end connection.query to assign product ID

  		 }); // end inquirer callback

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