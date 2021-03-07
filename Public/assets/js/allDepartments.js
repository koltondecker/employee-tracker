const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

const allDepartments = () => {

    connection.query(
        `SELECT * FROM department`,
        (err, res) => {
            
            if (err) throw err;

            console.table(res);

            index.mainMenu();

        }
    )

};

module.exports.allDepartments = allDepartments;