const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

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
        
        index.mainMenu();

    });

};

module.exports.addEmployee = addEmployee;