const express = require("express");
const { createPool } = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database Connection
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Finster_137", // Update with your password
    database: "tests",
    connectionLimit: 10,
});

// Routes

// 1. Add Student
app.post("/api/students", (req, res) => {
    const {
        First_Name,
        Last_Name,
        Email,
        Gender,
        Major,
        Emergency_Contact_Full_Name,
        Emergency_Contact_Phone_Number,
    } = req.body;

    const query = `
        INSERT INTO student (
            First_Name, 
            Last_Name, 
            Email, 
            Gender, 
            Major, 
            Emergency_Contact_Full_Name, 
            Emergency_Contact_Phone_Number
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    pool.query(
        query,
        [
            First_Name,
            Last_Name,
            Email,
            Gender,
            Major,
            Emergency_Contact_Full_Name,
            Emergency_Contact_Phone_Number,
        ],
        (err, result) => {
            if (err) {
                console.error("Error adding student:", err);
                return res.status(500).json({ error: "Error adding student" });
            }
            res.status(201).json({ message: "Student added successfully", result });
        }
    );
});

// 2. Delete Student
app.delete("/api/students/:id", (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM student WHERE Student_ID = ?";
    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error deleting student:", err);
            return res.status(500).json({ error: "Error deleting student" });
        }
        res.json({ message: "Student deleted successfully", result });
    });
});

// 3. View All Students
app.get("/api/students", (req, res) => {
    const query = "SELECT * FROM student";

    pool.query(query, (err, results) => {
        if (err) {
            console.error("Error retrieving students:", err);
            return res.status(500).json({ error: "Error retrieving students" });
        }
        res.json(results);
    });
});

// 4. View Filtered Students
app.get("/api/students/filter", (req, res) => {
    const { Major } = req.query;

    const query = `
        SELECT * FROM student 
        WHERE Student_ID = ?
    `;

    pool.query(query, [Student_ID], (err, results) => {
        if (err) {
            console.error("Error retrieving filtered students:", err);
            return res.status(500).json({ error: "Error retrieving filtered students" });
        }
        res.json(results);
    });
});

// 5. Update Student
app.put("/api/students/:id", (req, res) => {
    const { id } = req.params;
    const {
        First_Name,
        Last_Name,
        Email,
        Gender,
        Major,
        Emergency_Contact_Full_Name,
        Emergency_Contact_Phone_Number,
    } = req.body;

    const query = `
        UPDATE student
        SET 
            First_Name = ?, 
            Last_Name = ?, 
            Email = ?, 
            Gender = ?, 
            Major = ?, 
            Emergency_Contact_Full_Name = ?, 
            Emergency_Contact_Phone_Number = ?
        WHERE Student_ID = ?
    `;

    const values = [
        First_Name,
        Last_Name,
        Email,
        Gender,
        Major,
        Emergency_Contact_Full_Name,
        Emergency_Contact_Phone_Number,
        id,
    ];
    pool.query(query, values, (err, result) => {
        if (err) {
            console.error("Error updating student:", err);
            return res.status(500).json({ error: "Error updating student" });
        }
        res.json({ message: "Student updated successfully", result });
    });
});

// View Maintenance Requests
app.get("/api/maintenance-requests", (req, res) => {
  const query = "SELECT * FROM maintenancerequest";

  pool.query(query, (err, results) => {
      if (err) {
          console.error("Error retrieving maintenance requests:", err);
          return res.status(500).json({ error: "Error retrieving maintenance requests" });
      }
      res.json(results);
  });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
