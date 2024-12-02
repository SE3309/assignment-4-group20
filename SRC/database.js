const { createPool } = require("mysql2"); //run npm install mysql2 

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "", //enter your password here 
  database: "test",
  connectionLimit: 10,
});

let residencequery;


// Queries for student functionalities:
// 1. Add Student
function addStudent(
  First_Name,
  Last_Name,
  Email,
  Gender,
  Major,
  Emergency_Contact_Full_Name,
  Emergency_Contact_Phone_Number,
  callback
) {
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
  const values = [
    First_Name,
    Last_Name,
    Email,
    Gender,
    Major,
    Emergency_Contact_Full_Name,
    Emergency_Contact_Phone_Number,
  ];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error adding student:", err);
      return callback(err, null);
    }
    console.log("Student added successfully:", result);
    return callback(null, result);
  });
}

// 2. Delete Student
function deleteStudent(Student_ID, callback) {
  const query = `
    DELETE FROM student 
    WHERE Student_ID = ?
  `;

  pool.query(query, [Student_ID], (err, result) => {
    if (err) {
      console.error("Error deleting student:", err);
      return callback(err, null);
    }
    console.log("Student deleted successfully:", result);
    return callback(null, result);
  });
}

// 3. View All Students
function viewAllStudents(callback) {
  const query = `
    SELECT * 
    FROM student
  `;

  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving students:", err);
      return callback(err, null);
    }
    console.log("All students:", result);
    return callback(null, result);
  });
}

// 4. View Students with Filter
function viewFilteredStudents(Gender, Major, callback) {
  const query = `
    SELECT * 
    FROM student 
    WHERE Gender = ? AND Major = ?
  `;

  pool.query(query, [Gender, Major], (err, result) => {
    if (err) {
      console.error("Error retrieving filtered students:", err);
      return callback(err, null);
    }
    console.log("Filtered students:", result);
    return callback(null, result);
  });
}

// 5. Update Student
function updateStudent(
  Student_ID,
  First_Name,
  Last_Name,
  Email,
  Gender,
  Major,
  Emergency_Contact_Full_Name,
  Emergency_Contact_Phone_Number,
  callback
) {
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
    Student_ID,
  ];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      return callback(err, null);
    }
    console.log("Student updated successfully:", result);
    return callback(null, result);
  });
}

pool.query(`SELECT * FROM residence`, (err, result, fields) => {
  if (err) {
    return console.log(err);
  }

  residence = result;
  console.log(result);
  return; 
});

pool.query(`select * from student where Major="Engineering"`, (err, result, fields) => {
    if (err) {
        return console.log(err);
      }

      console.log(result);
      return; 
})

const insertQuery = `
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

// Replace these values with the actual data you want to insert
const studentData = [
  "John",                  // First_Name
  "Doe",                   // Last_Name
  "john.doe@example.com",  // Email
  "Male",                  // Gender
  "Engineering",           // Major
  "Jane Doe",              // Emergency_Contact_Full_Name
  "123-456-7890"           // Emergency_Contact_Phone_Number
];

// Insert the row into the table
pool.query(insertQuery, studentData, (err, result) => {
  if (err) {
    console.error("Error inserting row:", err);
    return;
  }
  console.log("Inserted successfully:", result);
});

// Export all functions
module.exports = {
  addStudent,
  deleteStudent,
  viewAllStudents,
  viewFilteredStudents,
  updateStudent,
};