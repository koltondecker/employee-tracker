const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

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
        
                            index.mainMenu();
                        }
                    );
                }
            );
        });
    });
};

module.exports.allEmployeesByManager = allEmployeesByManager;