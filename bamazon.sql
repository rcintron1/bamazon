CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products(
	item_id INT(5),
	product_name VARCHAR(100),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT(8),
    PRIMARY KEY (item_id)
);

CREATE TABLE IF NOT EXISTS users(
	userid INT(5),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    username VARCHAR(100),
    PRIMARY KEY (userid)
);

