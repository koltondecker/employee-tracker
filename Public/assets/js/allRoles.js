const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const connection = require('./db');
const index = require('../../../index');

const allRoles = () => {

    connection.query(
        `SELECT id, title, salary FROM role`,
        (err, res) => {

            if(err) throw err;

            console.table(res);

            index.mainMenu();

        }
    )

};

module.exports.allRoles = allRoles;