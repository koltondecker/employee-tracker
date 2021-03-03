const mysql = require('mysql');
const questions = require('./Public/assets/js/questions');

const connection = mysql.createConnection({
    host: 'localhost',
  
    port: 3306,
  
    user: 'root',
  
    password: 'Donutboy123!',
    database: 'employeesDB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    questions.mainMenu(connection);
});