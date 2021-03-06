const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const db = require('./db');

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

    db.query(
        // "SELECT * FROM employee, role, department WHERE employee.role_id = role.id AND role.department_id = department.id",
        'SELECT * FROM employee', 
        (err, res) => {

            if (err) throw err;

            console.table([res]);

            mainMenu();
        }
    );
};

const allEmployeesByDepartment = () => {



};

const allEmployeesByManager = () => {



};

const addEmployee = () => {



};

const removeEmployee = () => {



};

const updateEmployeeRole = () => {



};

const updateEmployeeManager = () => {



};

module.exports = mainMenu();