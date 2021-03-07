const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

const addRole = () => {

    inquire.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the role title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the department id?"
        }
    ]).then((answers) => {

        connection.query(
            `INSERT INTO role (title, salary, department_id)
            VALUES (${JSON.stringify(answers.title)}, ${JSON.stringify(answers.salary)}, ${JSON.stringify(answers.department_id)})`
        );

        index.mainMenu();

    });
};

module.exports.addRole = addRole;