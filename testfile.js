const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    port: process.env.port,
    password: process.env.password,
    database: process.env.database
});

const mainMenu = () => {

    inquire.prompt([
        {
            type: "list",
            name: "menuChoice",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "EXIT"
            ]
        }
    ]).then( (answer) => {

        switch (answer.menuChoice) {
            case "View All Employees":
                allEmployees();
                break;
            case "View All Employees by Department":
                allEmployeesByDepartment();
                break;
            case "View All Employees by Manager":
                allEmployeesByManager();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "EXIT":
                connection.end();
                break;
            default: 
                console.log("Sorry, something went wrong!");
                break;
        }
    });
};

const allEmployees = () => {

    connection.query(
        `SELECT e.id, e.first_name, e.last_name, r.title, d.department, r.salary
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id`,

        (err, res) => {

            if (err) throw err;

            console.table(res);

            mainMenu();
        }
    );
};

const allEmployeesByDepartment = () => {

    const departmentsArray = [];

    connection.query(
        `SELECT department FROM department`,
        (err, res) => {

            if (err) throw err;

            inquire.prompt([
                {
                    type: "list",
                    name: "department",
                    message: "Which department would you like to see employees for?",
                    choices() {
                        res.forEach(e => {
                            departmentsArray.push(e.department);
                        });
                        return departmentsArray;
                    }
                }
            ]).then( (answer) => {
        
                console.log(answer);

                connection.query(
                    `SELECT e.id, e.first_name, e.last_name, r.title, d.department, r.salary
                    FROM employee e
                    LEFT JOIN role r ON e.role_id = r.id
                    LEFT JOIN department d ON r.department_id = d.id
                    WHERE d.department = ${JSON.stringify(answer.department)}`,

                    (err, res) => {

                        if (err) throw err;

                        console.table(res);

                        mainMenu();
                    }
                );
            });
        }
    );  
};

const allEmployeesByManager = () => {

    const managersArray = [];

    connection.query(
        `SELECT first_name, last_name
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        WHERE r.title = "Manager"`,
    (err, res) => {

        if (err) throw err;

        inquire.prompt([
            {
                type: "list",
                name: "managerName",
                message: "Which manager would you like to sort by?",
                choices() {
                    res.forEach(e => {
                        managersArray.push(`${e.first_name} ${e.last_name}`);
                    });
                    return managersArray;
                }
            }
        ]).then( (answer) => {

            const nameArray = answer.managerName.split(' ');

            connection.query(
                `SELECT id
                FROM employee
                WHERE first_name = ${JSON.stringify(nameArray[0])}
                AND last_name = ${JSON.stringify(nameArray[1])}`,
                (err, selectedManagerID) => {

                    console.log(selectedManagerID[0].id);

                    if (err) throw err;

                    connection.query(
                        `SELECT e.id, e.first_name, e.last_name, r.title, d.department, r.salary
                        FROM employee e
                        LEFT JOIN role r ON e.role_id = r.id
                        LEFT JOIN department d ON r.department_id = d.id
                        WHERE e.manager_id = ${selectedManagerID[0].id}`,
        
                        (err, res) => {
        
                            if (err) throw err;
        
                            console.table(res);
        
                            mainMenu();
                        }
                    );
                }
            );
        });
    });
};

const addEmployee = () => {

    inquire.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "Last Name?"
        },
        {
            type: "input",
            name: "roleID",
            message: "Role ID?"
        },
        {
            type: "input",
            name: "managerID",
            message: "Manager ID?"
        }
    ]).then((answers) => {

        connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (${JSON.stringify(answers.firstName)}, ${JSON.stringify(answers.lastName)}, ${answers.roleID}, ${answers.managerID})`
        );
        
        mainMenu();

    });

};

const addRole = () => {

    inquire.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the role title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the department id?"
        }
    ]).then((answers) => {

        connection.query(
            `INSERT INTO role (title, salary, department_id)
            VALUES (${JSON.stringify(answers.title)}, ${JSON.stringify(answers.salary)}, ${JSON.stringify(answers.department_id)})`
        );

        mainMenu();

    });
};

const addDepartment = () => {

    inquire.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the new department?"
        }
    ]).then((answer) => {

        connection.query(
            `INSERT INTO department (department)
            VALUES (${JSON.stringify(answer.departmentName)})`
        );

        mainMenu();

    });

};

const removeEmployee = () => {

    let employeesArray = [];

    connection.query(
        `SELECT id, first_name, last_name FROM employee`,
        (err, res) => {

            inquire.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee would you like to remove?",
                    choices() {
                        res.forEach(e => {
                            employeesArray.push(`${e.first_name} ${e.last_name}`);
                        })
                        return employeesArray;
                    }
                }
            ]).then( (answer) => {

                const deleteEmployee = answer.employee.split(' ');
                const deleteEmployeeFirstName = deleteEmployee[0];
                const deleteEmployeeLastName = deleteEmployee[1];

                connection.query(
                    `DELETE FROM employee
                    WHERE first_name = ${JSON.stringify(deleteEmployeeFirstName)}
                    AND last_name = ${JSON.stringify(deleteEmployeeLastName)}`
                );

                mainMenu();

            }); 
        }
    );
};

const updateEmployeeRole = () => {

    let employeesArray = []

    connection.query(
        `SELECT first_name, last_name FROM employee`,
        (err, res) => {

            if (err) throw err;

            inquire.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee would you like to update the role for?",
                    choices() {
                        res.forEach(e => {
                            employeesArray.push(`${e.first_name} ${e.last_name}`);
                        });
                        return employeesArray;
                    }
                },
                {
                    type: "input",
                    name: "role",
                    message: "What is the new role id?"
                }
            ]).then( (answers) => {
        
                console.log(answers);

                const updateEmployeeRole = answers.employee.split(' ');
                const updateEmployeeRoleFirstName = JSON.stringify(updateEmployeeRole[0]);
                const updateEmployeeRoleLastName = JSON.stringify(updateEmployeeRole[1]);

                connection.query(
                    `UPDATE employee
                    SET role_id = ${answers.role}
                    WHERE first_name = ${updateEmployeeRoleFirstName}
                    AND last_name = ${updateEmployeeRoleLastName}`,

                    (err, res) => {

                        if (err) throw err;

                        mainMenu();
                    }
                );
            });
        }
    );  
};

const updateEmployeeManager = () => {

    let employeesArray = []

    connection.query(
        `SELECT first_name, last_name FROM employee`,
        (err, res) => {

            if (err) throw err;

            inquire.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee would you like to update the manager for?",
                    choices() {
                        res.forEach(e => {
                            employeesArray.push(`${e.first_name} ${e.last_name}`);
                        });
                        return employeesArray;
                    }
                },
                {
                    type: "input",
                    name: "managerID",
                    message: "What is the new manager id?"
                }
            ]).then( (answers) => {
        
                console.log(answers);

                const updateEmployeeRole = answers.employee.split(' ');
                const updateEmployeeRoleFirstName = JSON.stringify(updateEmployeeRole[0]);
                const updateEmployeeRoleLastName = JSON.stringify(updateEmployeeRole[1]);

                connection.query(
                    `UPDATE employee
                    SET manager_id = ${answers.managerID}
                    WHERE first_name = ${updateEmployeeRoleFirstName}
                    AND last_name = ${updateEmployeeRoleLastName}`,

                    (err, res) => {

                        if (err) throw err;

                        mainMenu();
                    }
                );
            });
        }
    ); 

};

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    mainMenu();
});