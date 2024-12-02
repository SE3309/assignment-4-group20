const API_URL = "http://localhost:3000";

function navigate(option) {
    const contentDiv = document.getElementById("content");
    let content = "";

    switch (option) {
        case "searchStudents":
            content = `
                <h2>Search Students</h2>
                <form id="searchForm">
                    <label>Gender: <input type="text" name="gender"></label>
                    <label>Major: <input type="text" name="major"></label>
                    <label>Residence: <input type="text" name="residence"></label>
                    <button type="submit">Search</button>
                </form>
                <div id="results"></div>
            `;
            break;

        case "addDeleteStudent":
            content = `
                <h2>Add/Delete Student</h2>
                <form id="addForm">
                    <label>Name: <input type="text" name="name" required></label>
                    <label>Gender: <input type="text" name="gender" required></label>
                    <label>Major: <input type="text" name="major" required></label>
                    <label>Residence: <input type="text" name="residence" required></label>
                    <button type="submit">Add Student</button>
                </form>
                <h3>Delete a Student</h3>
                <form id="deleteForm">
                    <label>ID: <input type="text" name="id" required></label>
                    <button type="submit">Delete Student</button>
                </form>
            `;
            break;

        case "updateStudent":
            content = `
                <h2>Update Student Profile</h2>
                <form id="updateForm">
                    <label>Student ID: <input type="text" name="id" required></label>
                    <label>Name: <input type="text" name="name"></label>
                    <label>Gender: <input type="text" name="gender"></label>
                    <label>Major: <input type="text" name="major"></label>
                    <label>Residence: <input type="text" name="residence"></label>
                    <button type="submit">Update Student</button>
                </form>
            `;
            break;

        case "viewRooms":
            fetch(`${API_URL}/rooms`)
                .then(res => res.json())
                .then(data => {
                    content = "<h2>Available Rooms</h2><ul>";
                    data.forEach(room => {
                        content += `<li>${room.room_number} - ${room.style} - ${room.amenities}</li>`;
                    });
                    content += "</ul>";
                    contentDiv.innerHTML = content;
                })
                .catch(err => {
                    contentDiv.innerHTML = `<p>Error: ${err.message}</p>`;
                });
            return;

        case "browseResidences":
            content = `
                <h2>Browse Residences</h2>
                <form id="browseForm">
                    <label>Style: <input type="text" name="style"></label>
                    <label>Amenities: <input type="text" name="amenities"></label>
                    <button type="submit">Browse</button>
                </form>
                <div id="residences"></div>
            `;
            break;

        case "borrowedItems":
            content = `
                <h2>Borrowed Items</h2>
                <form id="borrowForm">
                    <label>Student ID: <input type="text" name="student_id" required></label>
                    <label>Item Name: <input type="text" name="item_name" required></label>
                    <label>Borrow Date: <input type="date" name="borrow_date" required></label>
                    <button type="submit">Add Borrowed Item</button>
                </form>
                <h3>Borrowed Items Report</h3>
                <button id="generateReport">Generate Report</button>
                <div id="borrowedReport"></div>
            `;
            break;

        case "maintenanceRequests":
            content = `
                <h2>Maintenance Requests</h2>
                <form id="createRequestForm">
                    <label>Description: <input type="text" name="description" required></label>
                    <label>Status: <input type="text" name="status" required></label>
                    <button type="submit">Create Request</button>
                </form>
                <h3>View/Delete Maintenance Requests</h3>
                <div id="maintenanceRequests"></div>
            `;
            break;

        default:
            content = "<p>Invalid option selected</p>";
    }

    contentDiv.innerHTML = content;

    // Event Listeners for dynamic content
    if (option === "searchStudents") {
        document.getElementById("searchForm").addEventListener("submit", event => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const params = new URLSearchParams(formData).toString();
            fetch(`${API_URL}/students?${params}`)
                .then(res => res.json())
                .then(data => {
                    const resultsDiv = document.getElementById("results");
                    resultsDiv.innerHTML = "<ul>" + data.map(student => `<li>${student.name} (${student.major})</li>`).join("") + "</ul>";
                });
        });
    }

    if (option === "addDeleteStudent") {
        document.getElementById("addForm").addEventListener("submit", event => {
            event.preventDefault();
            const formData = new FormData(event.target);
            fetch(`${API_URL}/students`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(formData)),
            }).then(res => res.json()).then(data => alert(data.message));
        });

        document.getElementById("deleteForm").addEventListener("submit", event => {
            event.preventDefault();
            const formData = new FormData(event.target);
            fetch(`${API_URL}/students/${formData.get("id")}`, {
                method: "DELETE",
            }).then(res => res.json()).then(data => alert(data.message));
        });
    }

    if (option === "borrowedItems") {
        document.getElementById("borrowForm").addEventListener("submit", event => {
            event.preventDefault();
            const formData = new FormData(event.target);
            fetch(`${API_URL}/borrowed-items`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(formData)),
            }).then(res => res.json()).then(data => alert(data.message));
        });

        document.getElementById("generateReport").addEventListener("click", () => {
            fetch(`${API_URL}/borrowed-items/report`)
                .then(res => res.json())
                .then(data => {
                    const reportDiv = document.getElementById("borrowedReport");
                    reportDiv.innerHTML = "<ul>" + data.map(item => `<li>${item.student_name} borrowed ${item.item_name}</li>`).join("") + "</ul>";
                });
        });
    }
}
