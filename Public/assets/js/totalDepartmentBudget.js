const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

const totalDepartmentBudget = () => {

    let departmentsArray = [];

    connection.query(
        `SELECT department FROM department`,
        (err, res) => {

            inquire.prompt([
                {
                    type: "list",
                    name: "department",
                    message: "Which department would you like to see the total utilized budget for?",
                    choices() {
                        res.forEach(e => {
                            departmentsArray.push(e.department);
                        })
                        return departmentsArray;
                    }
                }
            ]).then( (answer) => {

                connection.query(
                    `SELECT SUM(salary) as TotalUtilizedBudget 
                    FROM employee e
                    LEFT JOIN role r ON e.role_id = r.id
                    LEFT JOIN department d ON r.department_id = d.id
                    WHERE department = ${JSON.stringify(answer.department)}`,
                    (err, res) => {

                        if (err) throw err;

                        console.table(res);

                        index.mainMenu();
                    }
                );
            }); 
        }
    );
};

module.exports.totalDepartmentBudget = totalDepartmentBudget;