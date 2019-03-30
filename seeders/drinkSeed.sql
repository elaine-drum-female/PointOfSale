DROP DATABASE IF EXISTS pos;
CREATE DATABASE pos;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
USE pos;

CREATE TABLE IF NOT EXISTS drinks(
   id INT AUTO_INCREMENT,
   drink_type VARCHAR(45),
   drink_name VARCHAR(45),
   price INT(10),
   quantity INT(10),
   PRIMARY KEY (id)
);


INSERT INTO drinks (drink_type, drink_name, price, quantity, updatedAt, createdAt)
VALUES ("alcohol", "Corona XL Light", 9.00, 1, CURDATE(), CURDATE());
