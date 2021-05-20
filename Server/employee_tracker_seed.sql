DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department
(
  id INT(11) NOT NULL
  AUTO_INCREMENT,
  names VARCHAR
  (30) NULL,
  PRIMARY KEY
  (id)
);

  CREATE TABLE roles
  (
    id INT NOT NULL
    AUTO_INCREMENT,
  title VARCHAR
    (30) NULL,
  salary INT NULL,
  department_id INT NULL,
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
        (title, salary, department_id)
      VALUES
        ('CEO', NULL, '1');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        ('Manager', '120000', '1');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        ('Head of Sales', '110000', '2');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        (' Sales person', '75000', '2');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        ('Lead Engineer', '85000', '3');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        ('Engineer', '85000', '3');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        ('Head of Finanace', '125000', '4');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        ('Accountant', '95000', '4');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        ('Legal team leader', NULL, '5');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        ('Lawyer', NULL, '5');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        ('Intern', '55000', '6');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        ('Intern level 1', '59000', '6');
      INSERT INTO roles
        (title, salary, department_id)
      VALUES
        ('Intern Level 2', '63000', '6');

      -- CREATE TABLE employee (
      --   id INT NOT NULL AUTO_INCREMENT,
      --   first_name VARCHAR(30) NULL,
      --   last_name VARCHAR(30) NULL,
      --   role_id INT NOT NULL,
      --   manager_id INT,
      --   PRIMARY KEY (id)
      -- );
      -- Managers
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Chris', 'Onions', 1 , NULL);
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Garr', 'Krizzy', 2, NULL);
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Sam', 'Gally', 3, NULL);
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Hellen', 'Ashwood', 5, NULL);
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Rita', 'Cowell', 2, NULL);
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Anil', 'Page', 7, NULL);
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Aaron', 'Ludwick', 9, NULL);

      -- Employees

      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Austin', 'Nerds', 11, 2);
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Fernando', 'Gonsalez', 4, 3);
