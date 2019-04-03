DROP DATABASE IF EXISTS pos;
CREATE DATABASE pos;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
USE pos;
CREATE TABLE IF NOT EXISTS employee(
   id INT AUTO_INCREMENT,
   emp_id INT(10),
   emp_name VARCHAR(45),
   hrlyWage INT(10),
   jobtitle VARCHAR(45),
   PRIMARY KEY (id)
)
CREATE TABLE IF NOT EXISTS drink(
   id INT AUTO_INCREMENT,
   drink_type VARCHAR(45),
   drink_name VARCHAR(45)
   price INT(10),
   quantity INT(10)
   PRIMARY KEY (id)
)
CREATE TABLE IF NOT EXISTS food(
   id INT AUTO_INCREMENT,
   food_type VARCHAR(45),
   food_name VARCHAR(45)
   price INT(10),
   quantity INT(10)
   PRIMARY KEY (id)
)
CREATE TABLE IF NOT EXISTS checks(
   id INT AUTO_INCREMENT,
   tab_name VARCHAR(45),
   items_ordered VARCHAR(255),
   sub_total INT(10)
   tip INT(10),
   Total INT(10)
   PRIMARY KEY (id)
)

INSERT INTO drinks (drink_type, drink_name, price, quantity, updatedAt, createdAt)
	VALUES ("soda", "Coke", 2.00, 10, CURDATE(), CURDATE()),
           ("soda", "Pepsi", 2.00, 10, CURDATE(), CURDATE()),
           ("soda", "Seven Up", 2.00, 10, CURDATE(), CURDATE()),
           ("tea", "Ice Tea", 2.00, 10, CURDATE(), CURDATE()),
           ("coffee", "Coffee", 2.50, 10, CURDATE(), CURDATE()),
           ("water", "Water", 0.00, 10, CURDATE(), CURDATE()),
           ("beer", "Miller Light", 3.00, 10, CURDATE(), CURDATE()),
           ("beer", "Stella", 4.00, 10, CURDATE(), CURDATE()),
           ("beer", "Guinness", 5.00, 10, CURDATE(), CURDATE()),
           ("wiskey", "Jameson", 10.00, 10, CURDATE(), CURDATE()),
           ("wiskey", "Jack Daniels", 9.00, 10, CURDATE(), CURDATE()),
           ("wiskey", "Crown Royale", 8.00, 10, CURDATE(), CURDATE()),
           ("vodka", "Titos", 8.00, 10, CURDATE(), CURDATE()),
           ("vodka", "Grey Goose", 10.00, 10, CURDATE(), CURDATE()),
           ("vodka", "Ketel One", 9.00, 10, CURDATE(), CURDATE()
);

INSERT INTO food (food_type, food_name, price, quantity, updatedAt, createdAt)
	VALUES ("appetizer", "Chips & Queso", 2.00, 10, CURDATE(), CURDATE()),
           ("appetizer", "Cheddar Fries", 2.00, 10, CURDATE(), CURDATE()),
           ("appetizer", "Pigs 'n Blanket", 2.00, 10, CURDATE(), CURDATE()),
           ("appetizer", "Beer Pretzel", 2.00, 10, CURDATE(), CURDATE()),
           ("appetizer", "Potato Skins", 2.00, 10, CURDATE(), CURDATE()),
           ("appetizer", "Quesadillas", 2.00, 10, CURDATE(), CURDATE()),
           ("entre", "Cheese Burger", 11.00, 10, CURDATE(), CURDATE()),
           ("entre", "BLT", 10.00, 10, CURDATE(), CURDATE()),
           ("entre", "Fish & Chips", 13.00, 10, CURDATE(), CURDATE()),
           ("entre", "Pub Club", 11.00, 10, CURDATE(), CURDATE()),
           ("entre", "3 Sliders", 10.00, 10, CURDATE(), CURDATE()),
           ("entre", "Cajun Chicken", 12.00, 10, CURDATE(), CURDATE()),
           ("salad", "Chef Salad", 10.00, 10, CURDATE(), CURDATE()),
           ("salad", "Sante Fe Salad", 10.00, 10, CURDATE(), CURDATE()),
           ("salad", "Buffalo Chicken", 10.00, 10, CURDATE(), CURDATE()
);