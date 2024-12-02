const { createPool } = require("mysql2"); //run npm install mysql2 

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "", //enter your password here 
  database: "test",
  connectionLimit: 10,
});

let residencequery;

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