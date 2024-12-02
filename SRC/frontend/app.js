document.addEventListener("DOMContentLoaded", () => {
  const API_BASE_URL = "http://localhost:3000/api";

  // 1. Add Student
  document.getElementById("add-student-btn").addEventListener("click", async () => {
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

    const data = {
      First_Name,
      Last_Name,
      Email,
      Gender,
      Major,
      Emergency_Contact_Full_Name,
      Emergency_Contact_Phone_Number,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Student added successfully!");
        console.log(result);
      } else {
        alert("Error adding student. Please try again.");
        console.error(await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // 2. View All Students
  document.getElementById("view-student-btn").addEventListener("click", async () => {
    const studentID = document.getElementById("view-student-id").value;

    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      if (response.ok) {
        const students = await response.json();
        const student = students.find((student) => student.Student_ID == studentID);

        if (student) {
          alert(
            `Student Details:\n\nName: ${student.First_Name} ${student.Last_Name}\nEmail: ${student.Email}\nGender: ${student.Gender}\nMajor: ${student.Major}\nEmergency Contact: ${student.Emergency_Contact_Full_Name} (${student.Emergency_Contact_Phone_Number})`
          );
        } else {
          alert("Student not found!");
        }
      } else {
        alert("Error retrieving student information.");
        console.error(await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // 3. Delete Student
  document.getElementById("delete-student-btn").addEventListener("click", async () => {
    const studentID = document.getElementById("delete-student-id").value;

    try {
      const response = await fetch(`${API_BASE_URL}/students/${studentID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        alert("Student deleted successfully!");
        console.log(result);
      } else {
        alert("Error deleting student. Please try again.");
        console.error(await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // 4. Update Student
  document.getElementById("update-student-btn").addEventListener("click", async () => {
    const Student_ID = document.getElementById("update-student-id").value;
    const First_Name = document.getElementById("update-first-name").value;
    const Last_Name = document.getElementById("update-last-name").value;
    const Email = document.getElementById("update-email").value;
    const Gender = document.getElementById("update-gender").value;
    const Major = document.getElementById("update-major").value;
    const Emergency_Contact_Full_Name = document.getElementById(
      "update-emergency-contact-name"
    ).value;
    const Emergency_Contact_Phone_Number = document.getElementById(
      "update-emergency-contact-phone"
    ).value;

    const data = {
      First_Name,
      Last_Name,
      Email,
      Gender,
      Major,
      Emergency_Contact_Full_Name,
      Emergency_Contact_Phone_Number,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/students/${Student_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Student updated successfully!");
        console.log(result);
      } else {
        alert("Error updating student. Please try again.");
        console.error(await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

document.getElementById("view-requests-btn").addEventListener("click", async () => {
  try {
      const response = await fetch("http://localhost:3000/api/maintenance-requests");

      if (response.ok) {
          const requests = await response.json();
          const formattedRequests = requests
              .map(
                  (request) =>
                      `Request #: ${request.Maintenance_Request_Number}, Type: ${request.Maintenance_Type}, Status: ${request.Status}`
              )
              .join("\n");
          alert(`Maintenance Requests:\n\n${formattedRequests}`);
      } else {
          alert("Error retrieving maintenance requests.");
          console.error(await response.json());
      }
  } catch (error) {
      console.error("Error:", error);
  }
});

