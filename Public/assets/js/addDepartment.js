const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

const addDepartment = () => {

    inquire.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the new department?"
        }
    ]).then((answer) => {

        connection.query(
            `INSERT INTO department (department)
            VALUES (${JSON.stringify(answer.departmentName)})`
        );

        index.mainMenu();

    });

};

module.exports.addDepartment = addDepartment;