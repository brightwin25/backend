const mysql = require('mysql2/promise');

const database = mysql.createPool({
    host: "localhost",
    user: "myapp_user",
    password: "Bright@1735",
    database: "myappdb",
});

module.exports = database;