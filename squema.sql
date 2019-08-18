DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    items_id INT
    AUTO_INCREMENT NOT NULL,
product_name VARCHAR
    (100) NOT NULL,
department_name VARCHAR
    (30),
price FLOAT NOT NULL,
stock_quantity INT NOT NULL, 
PRIMARY KEY
    (items_id)
);

