DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department
(
  id INT NOT NULL,
  names VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles
(
  id INT NOT NULL
  AUTO_INCREMENT,
  title VARCHAR
  (30) NULL,
  salary INT NULL,
  deparment_id INT NULL,
  PRIMARY KEY
  (id)
);

  CREATE TABLE employee
  (
    id INT NOT NULL
    AUTO_INCREMENT,
  first_name VARCHAR
    (30) NULL,
  last_name VARCHAR
    (30) NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY
    (id)
);

    INSERT INTO department
      (names)
    VALUES
      ('Management');
    INSERT INTO department
      (names)
    VALUES
      ('Sales');
    INSERT INTO department
      (names)
    VALUES
      ('Engineering');
    INSERT INTO department
      (names)
    VALUES
      ('Finance');
    INSERT INTO department
      (names)
    VALUES
      ('Legal');
    INSERT INTO department
      (names)
    VALUES
      ('Trainee');

    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('CEO', NULL, '1');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('Manager', '120000', '1');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('Head of Sales', '110000', '2');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      (' Sales person', '75000', '2');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('Lead Engineer', '85000', '3');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('Engineer', '85000', '3');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('Head of Finanace', '125000', '4');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('Accountant', '95000', '4');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('Legal team leader', 'Nul', '5');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('Lawyer', 'Nul', '5');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('Intern', '55000', '6');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('Intern level 1', '59000', '6');
    INSERT INTO roles
      (title, salary, deparment_id)
    VALUES
      ('Intern Level 2', '63000', '6');

    CREATE TABLE employee
    (
      id INT NOT NULL
      AUTO_INCREMENT,
  first_name VARCHAR
      (30) NULL,
  last_name VARCHAR
      (30) NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY
      (id)
);

      INSERT INTO employee
        (fires_name, last_name, role_id, manager,id)
      VALUES
        ('Chris', 'Onions',   )
