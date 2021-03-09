const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

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

                connection.query(
                    `SELECT e.id, e.first_name, e.last_name, r.title, d.department, r.salary
                    FROM employee e
                    LEFT JOIN role r ON e.role_id = r.id
                    LEFT JOIN department d ON r.department_id = d.id
                    WHERE d.department = ${JSON.stringify(answer.department)}`,

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

module.exports.allEmployeesByDepartment = allEmployeesByDepartment;