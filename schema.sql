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
   items_ordered VARCHAR(45),
   sub_total INT(10)
   tip INT(10),
   Total INT(10)
   PRIMARY KEY (id)
)