const mysql = require('mysql');
const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');


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
      choices: ['See All Employees', 'View all titles By Department', 'Add employee', 'Remove employee', 'Update employee role', 'Add Role', 'Exit']
    })
    .then((Choice) => {
      // console.log("You chose : ", Choice);
      switch (Choice.options) {
        case 'See All Employees':
          //Add all case options
          readEmployee_Data_func()
          break
        case 'View all titles By Department':
          View_by_department()
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
        case 'Add Role':
          addRole()
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
  connection.query('select * from roles', (err, res) => {
    if (err) throw err
    let choice_arr = res.map(role => ({
      name: role.title,
      value: role.id
    }))

    connection.query(
      'SELECT id, first_name, last_name, role_id from employee', (err, data) => {
        if (err) throw err
        const employees = data.map(names => ({
          id: names.id,
          name: `${names.first_name} ${names.last_name}`,
          role_id: names.role_id
        }))
        const employee_id = data.map(names => ({
          name: names.id,
        }))
        console.log(employees);
        inquirer
          .prompt([
            {
              name: 'names',
              type: 'rawlist',
              message: 'Who would you like to update',
              choices: employees,
            },
            {
              name: 'role_id',
              type: 'list',
              message: 'What is the new role',
              choices: choice_arr,
            },
            {
              name: 'id',
              type: 'list',
              message: 'what is the id of the employee',
              choices: employee_id,
            },
          ]).then((Choice) => {
            // console.log(data);
            // UPDATE employee SET  role_id = 7 WHERE id = 16;
            connection.query('UPDATE employee SET ? WHERE ?',
              [
                {
                  role_id: Choice.role_id,
                },
                {
                  id: Choice.id,
                },
              ],
              listOfOptions()
            )

          })
      })
  })
}



function View_by_department() {
  connection.query('SELECT roles.id, roles.title, department.names AS department FROM roles INNER JOIN department ON roles.department_id = department.id', (err, res) => {
    if (err) throw err
    console.table(res);
    listOfOptions()
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
          },
          {
            name: 'last_name',
            type: 'input',
            message: 'Please enter employee last name',
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
function addRole() {
  //connection.query get depatemny id 
  inquirer.
    prompt([
      {
        name: 'Title',
        type: 'input',
        message: 'Enter title of new role',
      },
      {
        name: 'Salary',
        type: 'input',
        message: 'Enter Salary of new role',
      },
      {
        name: 'Department',
        type: 'input',
        message: 'Enter Department of new role',
      },
    ]
    ).then((data) => {
      console.log(data);
      console.log(data.Title);
      console.log(data.Salary);
      connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${data.Title}', '${data.Salary}', '1')`)
    })
}


