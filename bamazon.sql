CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products(
	item_id INT(5) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT(8),
    PRIMARY KEY (item_id)
);

CREATE TABLE IF NOT EXISTS users(
	userid INT(5) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (userid)
);

INSERT INTO products ( )values
(),
(),
(),
