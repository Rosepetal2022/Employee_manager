const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to the Employee Manager App!")
    initialQuestion();
});

function initialQuestion() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'initialQuestion',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add an employee', 'add a role', 'update an employee role']
        },
    ).then(function (userInput) {
        switch (userInput.initialQuestion) {
            case 'view all departments':
                departmentTable();
                break;
            case 'view all roles':
                rolesTable();
                break;
            case 'view all employees':
                employeesTable();
                break;
            case 'add a department':
                addDepartment();
                break;
            case 'add an employee':
                addEmployee();
                break;
            case 'add a role':
                addRole();
                break;
            case 'update an employee role':
                updateRole();
                break;
            default:
                alert('You must pick one!');
                return;

        }
    });
};

function departmentTable() {
    connection.query('SELECT * FROM departments', function (err, results) {
        if (err) throw err;
        console.table(results);
        initialQuestion();
    });
}

function rolesTable() {
    connection.query('SELECT roles.id, title, salary, department_id, department_name FROM roles JOIN departments ON roles.department_id = departments.id', 
    function (err, results) {
        if (err) throw err
        console.table(results);
        initialQuestion();
    })
};

function employeesTable() {
    connection.query(
        'SELECT first_name, last_name, title, department_name, salary, manager FROM roles JOIN employees ON roles.id = employees.role_id JOIN departments ON roles.department_id = departments.id', 
        function (err, results) {
        
        if (err) throw err;
        console.table(results);
        initialQuestion();
    })
};

function addDepartment () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please enter the department you would like to add.',
            validate: newDepartmentInput => {
                if(newDepartmentInput) {
                    return true;
                } else {
                    console.log('Please enter a department!');
                    return false;
                }
            }
        }
    ]).then((userInput) => {
        let sql = 'INSERT INTO departments(department_name) VALUES(?)';
        const department = userInput.newDepartment

        connection.query(sql, department, function (err, results) {
            if (err) throw (err);
            console.table(departmentTable());
        });
    });
}

//add first_name, last_name, role, and manager
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'Please enter the first name of your employee.',
            validate: employeeFirstNameInput => {
                if (employeeFirstNameInput) {
                    return true;
                } else {
                    console.log('Please enter the employee name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'Please enter the last name of your employee.',
            validate: employeeLastNameInput => {
                if (employeeLastNameInput) {
                    return true;
                } else {
                    console.log('Please enter the employee name!');
                    return false;
                }
            },
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'Please enter the employee role id.',
            validate: employeeRoleInput => {
                if (employeeRoleInput) {
                    return true;
                } else {
                    console.log('Please enter the role!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: 'Please enter the employee manager.',
            validate: employeeManagerInput => {
                if (employeeManagerInput) {
                    return true;
                } else {
                    console.log('Please enter the manager!');
                    return false;
                }
            }
        }
    ]).then((userInput) => {
        const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager) VALUES (?,?,?,?)';
        const employee =  
            [userInput.employeeFirstName, 
            userInput.employeeLastName,
            userInput.employeeRole,
            userInput.employeeManager]
       
            connection.query(sql, employee, function (err, results) {
                if (err) throw (err);
                console.table(employeesTable());
            }
        )
    })
};

//add role name, salary, department 
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Please enter the role you would like to add',
            validate: roleNameInput => {
                if (roleNameInput) {
                    return true;
                } else {
                    console.log('Please enter name of role!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Please enter the salary for the role.',
            validate: roleSalaryInput => {
                if (roleSalaryInput) {
                    return true;
                } else {
                    console.log('Please enter salary!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleDepartment',
            message: 'Please enter department id for this role',
            validate: roleDepartmentInput => {
                if (roleDepartmentInput) {
                    return true;
                } else {
                    console.log('Please enter department!');
                    return false;
                }
            }
        }
    ]).then((userInput) => {
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
        const role =  
            [userInput.roleName, 
            userInput.roleSalary,
            userInput.roleDepartment]
       
            connection.query(sql, role, function (err, results) {
                if (err) throw (err);
                console.table(rolesTable());
            }
        )
    })
};

function updateRole() {
    //let employees = 'SELECT * FROM employees';
    inquirer.prompt([
        {
            type: 'input',
            name: 'updateEmp',
            message: 'What is the id of the employee you would like to update?',
        },
        {
            type: 'input',
            name: 'updateRole',
            message: 'What is the new role id?'
        }
    ]).then((userInput) => {
        connection.query(`UPDATE employees SET role_id = ${userInput.updateRole} WHERE id = ${userInput.updateEmp}`, function(err, results){
            if(err) throw err;
            console.table(employeesTable());
        });
    });
};