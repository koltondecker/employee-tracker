const mysql = require('mysql');

function connectDB() {

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
    });
}

module.exports = connectDB();