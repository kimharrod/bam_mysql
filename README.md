# bam_mysql
storefront database app


### Overview

This node app uses MySQL to create a storefront interface that runs in the terminal.

There is a customer interface and a manager interface.


### Customer Interface


The customer interface prompts the user to select a product to purchase from a list of inventory.
Once a product is selected, the user is prompted for a quantity they would like to purchase.

1. The app checks to see if the desired quantity is available. 

2. If yes, the user is provided a total price for their purchase. 

![Customer Purchase](http://fios.com/kim/mysql/img_c11d-91fa.png "Customer purchase interface")

3. If not enough product is available, the user receives a message that there is insufficient quantity, along with the available units in inventory. 

4. Providing the additional information about the available units in inventory allows the user to adjust their desired quantity in order to complete the purchase.

![Customer Purchase Insufficient Inventory](http://fios.com/kim/mysql/img_2dde-2858.png "Customer message when there is insufficient quantity available")


### Manager Interface


The manager interface allows for four different store management activities:

![Manager Task Interface](http://fios.com/kim/mysql/img_f810-900f.png "Manager task interface")

1. View products for sale - displays a table of all available products in the store's inventory

2. View low inventory (in this case, fewer than 5 of an item in stock)

3. Add to inventory - the manager can add to the quantity of any item in the store

4. Add new product - the manager is prompted for the details required to add a new product to the storefront

![Manager New Product Prompts](http://fios.com/kim/mysql/img_3d7c-649d.png "Manager interface to add a new product")


### Dependencies and Packages

Both apps require the 'mysql' and 'inquirer' npm packages.

A configuration object defined in `config.js` is used to establish a connection to the storefront MySQL database.

Additionally, the npm package console.table is used to attractively format the product data displayed in the terminal.













