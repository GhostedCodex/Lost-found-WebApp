const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hellboy@11',
    database: 'lost_and_found'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
}) 

module.exports = connection;