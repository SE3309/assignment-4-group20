const db = require('SRC\config\db.js'); // Adjust the path as needed

// Example query to test the connection
db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) throw err;
    console.log('The solution is: ', results[0].solution);
});
