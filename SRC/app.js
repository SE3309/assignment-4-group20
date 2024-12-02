const db = require('SRC\config\db.js'); // Adjust the path as needed

// Example query to test the connection
db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) throw err;
    console.log('The solution is: ', results[0].solution);
});

function showOption(option) {
    const contentDiv = document.getElementById('content');
    let content = '';

    switch (option) {
        case 'addRecord':
            content = `
                <h2>Add a Record</h2>
                <form id="addRecordForm">
                    <label for="recordName">Name:</label>
                    <input type="text" id="recordName" name="recordName" required>
                    <label for="recordValue">Value:</label>
                    <input type="text" id="recordValue" name="recordValue" required>
                    <button type="submit">Submit</button>
                </form>
            `;
            break;
        case 'viewRecords':
            content = `<h2>View Records</h2><p>Loading records...</p>`;
            fetchRecords(); // Call the backend to fetch records
            break;
        case 'updateRecord':
            content = `
                <h2>Update a Record</h2>
                <form id="updateRecordForm">
                    <label for="recordId">Record ID:</label>
                    <input type="text" id="recordId" name="recordId" required>
                    <label for="newValue">New Value:</label>
                    <input type="text" id="newValue" name="newValue" required>
                    <button type="submit">Update</button>
                </form>
            `;
            break;
        case 'deleteRecord':
            content = `
                <h2>Delete a Record</h2>
                <form id="deleteRecordForm">
                    <label for="recordIdToDelete">Record ID:</label>
                    <input type="text" id="recordIdToDelete" name="recordIdToDelete" required>
                    <button type="submit">Delete</button>
                </form>
            `;
            break;
        case 'searchRecord':
            content = `
                <h2>Search Records</h2>
                <form id="searchRecordForm">
                    <label for="searchQuery">Search Query:</label>
                    <input type="text" id="searchQuery" name="searchQuery" required>
                    <button type="submit">Search</button>
                </form>
            `;
            break;
        case 'customQuery':
            content = `
                <h2>Run Custom Query</h2>
                <form id="customQueryForm">
                    <label for="customSQL">SQL Query:</label>
                    <textarea id="customSQL" name="customSQL" required></textarea>
                    <button type="submit">Run Query</button>
                </form>
            `;
            break;
        default:
            content = `<p>Option not available.</p>`;
    }

    contentDiv.innerHTML = content;
}
