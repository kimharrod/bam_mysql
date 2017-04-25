create database Bamazon;
use Bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL (10, 2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (1,"hatchimal", "toys", 59.99, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (2,"fidget spinner", "gadgets", 14.99, 25);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (3,"glitter tape", "crafts", 2.99, 50);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (4,"dollhouse", "toys", 159.99, 2);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (5,"thinking putty", "gadgets", 14.99, 25);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (6,"melty beads", "crafts", 10.99, 30);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (7,"squishable", "toys", 34.99, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (8,"marbles", "gadgets", 14.99, 25);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (9,"bead kit", "crafts", 12.99, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (10,"legos", "toys", 14.99, 25);

UPDATE products
SET price = 44.99
WHERE item_id = 10;