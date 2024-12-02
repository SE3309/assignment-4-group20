const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Finster_137",
    database: "3309",
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to database");
});

// Routes
app.get("/students", (req, res) => {
    const { gender, major, residence } = req.query;
    let query = "SELECT * FROM students WHERE 1=1";
    const values = [];
    if (gender) {
        query += " AND gender = ?";
        values.push(gender);
    }
    if (major) {
        query += " AND major = ?";
        values.push(major);
    }
    if (residence) {
        query += " AND residence = ?";
        values.push(residence);
    }
    db.query(query, values, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post("/students", (req, res) => {
    const { name, gender, major, residence } = req.body;
    const query = "INSERT INTO students (name, gender, major, residence) VALUES (?, ?, ?, ?)";
    db.query(query, [name, gender, major, residence], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Student added successfully", id: results.insertId });
    });
});

app.delete("/students/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM students WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Student deleted successfully" });
    });
});

app.get("/rooms", (req, res) => {
    const query = "SELECT * FROM rooms WHERE status = 'available'";
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Add more routes here...

app.listen(3000, () => console.log("Server running on port 3000"));
