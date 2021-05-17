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


function creatEemployee_func() {
  console.log('Creating employee');
  connection.query(
    'INSERT employee SET ?',
    {
      first_Name: 'Employee name here',
      last_Name: 'Employee name here',
      role_Id: 'Manager'
    },
    (err) => {
      if (err) throw err;
    })
}

function readEmployee_Data_func() {
  console.log('reading data');
  connection.query('select * from employee', (err, res) => {
    if (err) throw err

    console.table(res)
    connection.end()
  })
}
function updateEmployee_Data_func() {
  console.log('Updating data');
  // inquirer who would you like to update?
  // What would you like to update? manager_id, 
  //
}
function deleteEmployee_Data_func() {
  console.log('Deleting data');
  // inquirer "who would you like to remove?"
  // Display all employees to select from
  connection.query('select * from employee', (err, res) => {
    if (err) throw err
    console.table(res)
    // Remove selected item
    // DELETE FROM products WHERE ?
    // Display table again with reoved items
    // Go back to menu
  })
}
function addEmployee() {
  connection.query('select * from department', (err, res) => {
    if (err) throw err
    let choice_arr = []
    console.table(res);
    res.forEach(({ names }) => {
      choice_arr.push(names)
    });

    console.log(choice_arr);
    inquirer.
      prompt([
        {
          name: 'first_Name',
          type: 'input',
          message: 'Please enter employee first name',
          default: 'Employee name here'
        },
        {
          name: 'last_Name',
          type: 'input',
          message: 'Please enter employee last name',
          default: 'Employee name here'
        },
        {
          name: 'role_Id',
          type: 'rawlist',
          choices: (choice_arr),
          message: 'Please enter employee role'
          // Manager id comes from the id if its a manager?
          // how do i get that ?
        },
        // {
        //   name: 'manager_Id',
        //   type: 'input',
        //   message: 'Please enter employee manger id',
        //   default: 'Employee name here'
        // }
      ])//add role via choice

      .then((choices) => {
        //'INSERT INTO employee SET ?'
        console.log(choices);

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
// 	   roles.salary
// FROM employee, roles, department 
// WHERE department.id = roles.department_id
// AND roles.id = employee.role_id
// ORDER BY employee.id 
// ----------------------------------------------
// Selects all people and role and department 

// select first_name, last_name, title, salary, names   from employee,  roles, department where employee.id = roles.id; 
