CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products(
	item_id INT(10) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT(8),
    PRIMARY KEY (item_id)
);

CREATE TABLE IF NOT EXISTS users(
	userid INT(10) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (userid)
);

CREATE TABLE IF NOT EXISTS purchase_history(
	trans_id INT(10) NOT NULL AUTO_INCREMENT,
    trans_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    userid INT(10) NOT NULL,
    item_id INT(10),
    PRIMARY KEY(trans_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity ) values
("Fiddles", "music", 200, 20),
("IPhones", "electronics", 1000.40, 50),
("Vitamin C pills", "health", 12.50, 25);
