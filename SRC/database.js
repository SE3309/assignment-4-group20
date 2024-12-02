const { createPool } = require("mysql2"); //run npm install mysql2 

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Finster_137", //enter your password here 
  database: "test",
  connectionLimit: 10,
});

let residencequery;

// Add Event Listeners for Student Operations

document.addEventListener("DOMContentLoaded", () => {
  // 1. Add Student
  document.getElementById("add-student-btn").addEventListener("click", () => {
    const First_Name = document.getElementById("first-name").value;
    const Last_Name = document.getElementById("last-name").value;
    const Email = document.getElementById("email").value;
    const Gender = document.getElementById("gender").value;
    const Major = document.getElementById("major").value;
    const Emergency_Contact_Full_Name = document.getElementById(
      "emergency-contact-name"
    ).value;
    const Emergency_Contact_Phone_Number = document.getElementById(
      "emergency-contact-phone"
    ).value;

    addStudent(
      First_Name,
      Last_Name,
      Email,
      Gender,
      Major,
      Emergency_Contact_Full_Name,
      Emergency_Contact_Phone_Number,
      (err, result) => {
        if (err) {
          alert("Error adding student. Please try again.");
          console.error(err);
        } else {
          alert("Student added successfully!");
          console.log(result);
        }
      }
    );
  });

  // 2. View Student
  document.getElementById("view-student-btn").addEventListener("click", () => {
    const studentID = document.getElementById("view-student-id").value;

    viewAllStudents((err, students) => {
      if (err) {
        alert("Error retrieving student information.");
        console.error(err);
      } else {
        const student = students.find(
          (student) => student.Student_ID == studentID
        );
        if (student) {
          alert(
            `Student Details:\n\nName: ${student.First_Name} ${student.Last_Name}\nEmail: ${student.Email}\nGender: ${student.Gender}\nMajor: ${student.Major}\nEmergency Contact: ${student.Emergency_Contact_Full_Name} (${student.Emergency_Contact_Phone_Number})`
          );
        } else {
          alert("Student not found!");
        }
      }
    });
  });

  // 3. Delete Student
  document.getElementById("delete-student-btn").addEventListener("click", () => {
    const studentID = document.getElementById("delete-student-id").value;

    deleteStudent(studentID, (err, result) => {
      if (err) {
        alert("Error deleting student. Please try again.");
        console.error(err);
      } else {
        alert("Student deleted successfully!");
        console.log(result);
      }
    });
  });

  // 4. Update Student
  document.getElementById("update-student-btn").addEventListener("click", () => {
    const Student_ID = document.getElementById("update-student-id").value;
    const First_Name = document.getElementById("first-name").value;
    const Last_Name = document.getElementById("last-name").value;
    const Email = document.getElementById("email").value;
    const Gender = document.getElementById("gender").value;
    const Major = document.getElementById("major").value;
    const Emergency_Contact_Full_Name = document.getElementById(
      "emergency-contact-name"
    ).value;
    const Emergency_Contact_Phone_Number = document.getElementById(
      "emergency-contact-phone"
    ).value;

    updateStudent(
      Student_ID,
      First_Name,
      Last_Name,
      Email,
      Gender,
      Major,
      Emergency_Contact_Full_Name,
      Emergency_Contact_Phone_Number,
      (err, result) => {
        if (err) {
          alert("Error updating student. Please try again.");
          console.error(err);
        } else {
          alert("Student updated successfully!");
          console.log(result);
        }
      }
    );
  });
});

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

function createInventorySummaryView(callback) {
  const query = `
    CREATE OR REPLACE VIEW InventorySummaryByResidence AS
    SELECT 
        Residence_Name,
        Category,
        SUM(Quantity) AS Total_Quantity
    FROM 
        cafinventory
    GROUP BY 
        Residence_Name, Category;
  `;

  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error creating InventorySummaryByResidence view:", err);
      return callback(err, null);
    }
    console.log("InventorySummaryByResidence view created successfully:", result);
    return callback(null, result);
  });
};

function fetchInventorySummary(callback) {
  const query = `
    SELECT * 
    FROM InventorySummaryByResidence;
  `;

  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching InventorySummaryByResidence:", err);
      return callback(err, null);
    }
    console.log("Fetched InventorySummaryByResidence:", result);
    return callback(null, result);
  });
}

// Export all functions
module.exports = {
  addStudent,
  deleteStudent,
  viewAllStudents,
  viewFilteredStudents,
  updateStudent,
};