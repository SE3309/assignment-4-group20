const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',          // Your MySQL server host (usually 'localhost')
    user: 'root',      // Your MySQL username (e.g., 'root')
    password: 'your_password',  // Your MySQL password
    database: 'your_database'   // The name of your database in Workbench
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;
