const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'ChristopherOnions',
  database: 'employee_tracker',
});

// Connect to the DB
connection.connect((err) => {
  if (err) throw err;
  listOfOptions()
});
function listOfOptions() {
  inquirer
    .prompt({
      name: 'options',
      type: 'list',
      message: 'What Would You like to do?',
      choices: ['See All Employees', 'View all employees By Department', 'View all employees by Manager', 'Add employee', 'Remove employee', 'Update employee role', 'Update employee manager', 'Exit']
    })
    .then((Choice) => {
      // console.log("You chose : ", Choice);
      switch (Choice.options) {
        case 'See All Employees':
          //Add all case options
          readEmployee_Data_func()
          break
        case 'View all employees By Department':
          break
        case 'View all employees by Manager':
          break
        case 'Add employee':
          addEmployee()
          break
        case 'Remove employee':
          deleteEmployee_Data_func()
          break
        case 'Update employee role':
          updateEmployee_Data_func()
          break
        case 'Update employee manager':
          break
        case 'Exit':
          console.log('Thanks for playing');
          connection.end();
          break
        default:
          console.log('We have run into major issues');
      }
    })
}
// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles

function readEmployee_Data_func() {
  console.log('reading data');
  connection.query('SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.names AS department, roles.salary, CONCAT(manager.first_name," ", manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id', (err, res) => {
    if (err) throw err

    console.table(res)
    listOfOptions()
  })
}
function updateEmployee_Data_func() {
  console.log('Updating data');
  // inquirer who would you like to update?
  // What would you like to update? manager_id, 
  //
}
function View_by_department() {
  connection.query('SELECT roles.id, roles.title, department.names AS department FROM roles INNER JOIN department ON roles.department_id = department.id', (err, res) => {
    if (err) throw err
    console.table(res);
  })
}
function deleteEmployee_Data_func() {
  console.log('Deleting data');
  // inquirer "who would you like to remove?"
  // Display all employees to select from
  connection.query('select * from employee', (err, res) => {
    if (err) throw err

    const employees = res.map(role => ({
      name: `${role.first_name} ${role.last_name}`,
      value: role.id
    }))

    inquirer.
      prompt(
        {
          name: 'delete',
          type: 'list',
          message: 'Who would you like to remove?',
          choices: employees,

        }).then((employee_delete) => {
          connection.query(
            'DELETE FROM employee  WHERE ?', [
            {
              id: employee_delete.delete,
            },
          ],
            (err, res) => {
              if (err) throw err
              console.log('Employee deleted');
              listOfOptions()
            }
          )
        })
    // Remove selected item
    // DELETE FROM products WHERE ?
    // Display table again with reoved items
    // Go back to menu
  })
}
function addEmployee() {
  connection.query('select * from roles', (err, res) => {
    if (err) throw err

    // console.table(res);
    let choice_arr = res.map(role => ({
      name: role.title,
      value: role.id
    })
    );

    connection.query('select * from employee where manager_id is null', (err, data) => {
      if (err) throw err
      let choice_arr1 = data.map(role => ({
        name: `${role.first_name} ${role.last_name}`,
        value: role.id
      })
      );
      inquirer.
        prompt([
          {
            name: 'first_name',
            type: 'input',
            message: 'Please enter employee first name',
            default: 'Employee name here'
          },
          {
            name: 'last_name',
            type: 'input',
            message: 'Please enter employee last name',
            default: 'Employee name here'
          },
          {
            name: 'role_id',
            type: 'rawlist',
            choices: choice_arr,
            message: 'Please enter employee role'
            // Manager id comes from the id if its a manager?
            // how do i get that ?
          },
          {
            name: 'manager_id',
            type: 'rawlist',
            message: 'Please enter employee manger id',
            choices: choice_arr1
          }
        ])//add role via choice

        .then((choices) => {
          //'INSERT INTO employee SET ?'
          console.log(choice_arr1);
          connection.query('INSERT employee SET ?', choices,
            (err) => {
              if (err) throw err;
              listOfOptions()
            })
        })
    })
  })
}

// ------------------------------------------------
// select all titles and the roles they acompany 
// SELECT roles.id, roles.title, department.names AS department
//                   FROM roles
//                   INNER JOIN department ON roles.department_id = department.id;
// ------------------------------------------------
// select all deparments
// select * from department; 
// SELECT department.id AS id, department.names AS department FROM department
// ----------------------------------------------
// view all employees by department 
// SELECT employee.first_name, 
// 	   employee.last_name, 
// 	   department.names
// AS department
// FROM employee 
// LEFT JOIN roles
// ON employee.id = roles.id 
// LEFT JOIN department 
// ON roles.id = department.id;
// delete from roles where id = 2
// ----------------------------------------------
// select all employees
// SELECT employee.id, 
// 	   employee.first_name, 
//        employee.last_name, 
// 	   roles.title,                  
// 	   department.names AS 'department', 
// 	   roles.salary,
//     concat(employee.first_name,' ', 
//       employee.last_name )AS manager
// FROM employee, roles, department 
// WHERE department.id = roles.department_id
// AND roles.id = employee.role_id
// AND employee.manager_id = employee.id
// ORDER BY employee.id 
// ----------------------------------------------
// Selects all people and role and department 

// select first_name, last_name, title, salary, names   from employee,  roles, department where employee.id = roles.id; 
