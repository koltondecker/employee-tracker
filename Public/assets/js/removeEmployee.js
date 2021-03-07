const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

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

                index.mainMenu();

            }); 
        }
    );
};

module.exports.removeEmployee = removeEmployee;