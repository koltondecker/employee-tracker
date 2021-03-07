const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

const allEmployees = () => {

    connection.query(
        `SELECT e.id, e.first_name, e.last_name, r.title, d.department, r.salary
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id`,

        (err, res) => {

            if (err) throw err;

            console.table(res);

            index.mainMenu();
        }
    );
};

module.exports.allEmployees = allEmployees;