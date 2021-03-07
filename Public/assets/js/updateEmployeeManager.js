const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

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

                        index.mainMenu();
                    }
                );
            });
        }
    ); 
};

module.exports.updateEmployeeManager = updateEmployeeManager;