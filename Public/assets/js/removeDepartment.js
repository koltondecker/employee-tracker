const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

const removeDepartment = () => {

    let departmentsArray = [];

    connection.query(
        `SELECT department FROM department`,
        (err, res) => {

            inquire.prompt([
                {
                    type: "list",
                    name: "department",
                    message: "Which department would you like to remove?",
                    choices() {
                        res.forEach(e => {
                            departmentsArray.push(e.department);
                        })
                        return departmentsArray;
                    }
                }
            ]).then( (answer) => {

                connection.query(
                    `DELETE FROM department
                    WHERE department = ${JSON.stringify(answer.department)}`
                );

                index.mainMenu();

            }); 
        }
    );
};

module.exports.removeDepartment = removeDepartment;