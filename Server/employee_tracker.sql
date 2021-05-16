-- DROP DATABASE IF EXISTS employee_tracker;

-- CREATE DATABASE employee_tracker;

-- USE employee_tracker;

-- CREATE TABLE department (
--   id INT NOT NULL,
--   names VARCHAR(30) NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE roles (
--   id INT NOT NULL AUTO_INCREMENT,
--   title VARCHAR(30) NULL,
--   salary INT NULL,
--   deparment_id INT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE employee (
--   id INT NOT NULL AUTO_INCREMENT,
--   first_name VARCHAR(30) NULL,
--   last_name VARCHAR(30) NULL,
--   role_id INT NOT NULL,
--   manager_id INT NOT NULL,
--   PRIMARY KEY (id)
-- );
-- -- INSERT INTO products (flavor, price, quantity)
-- -- VALUES ("vanilla", 2.50, 100);