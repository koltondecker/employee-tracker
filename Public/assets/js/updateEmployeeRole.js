const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

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

                        index.mainMenu();
                    }
                );
            });
        }
    );  
};

module.exports.updateEmployeeRole = updateEmployeeRole;