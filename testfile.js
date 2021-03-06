const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Donutboy123!',
    database: 'employeesDB'
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

    //TODO: do this function!!!

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



};

const removeEmployee = () => {

    const employeesArray = [];

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

    //TODO: do this function!!!

};

const updateEmployeeManager = () => {

    //TODO: do this function!!!

};

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    mainMenu();
});