const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

const removeRole = () => {

    let rolesArray = [];

    connection.query(
        `SELECT title FROM role`,
        (err, res) => {

            inquire.prompt([
                {
                    type: "list",
                    name: "role",
                    message: "Which role would you like to remove?",
                    choices() {
                        res.forEach(e => {
                            rolesArray.push(e.title);
                        })
                        return rolesArray;
                    }
                }
            ]).then( (answer) => {

                connection.query(
                    `DELETE FROM role
                    WHERE title = ${JSON.stringify(answer.role)}`
                );

                index.mainMenu();

            }); 
        }
    );

};

module.exports.removeRole = removeRole;