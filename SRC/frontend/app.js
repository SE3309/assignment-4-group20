const API_BASE_URL = "http://localhost:3000/api";
document.addEventListener("DOMContentLoaded", () => {

  // 1. Add Student
  const addStudentBtn = document.getElementById("add-student-btn");
  if(addStudentBtn){
    addStudentBtn.addEventListener("click", async () => {
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
  }

  const viewStudentBtn = document.getElementById("view-student-btn");
  if (viewStudentBtn) {
    viewStudentBtn.addEventListener("click", async () => {
      const studentID = document.getElementById("view-student-id").value;

      try {
        const response = await fetch(`${API_BASE_URL}/students`);
        if (response.ok) {
          const students = await response.json();
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
        } else {
          alert("Error retrieving student information.");
          console.error(await response.json());
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }

  // 3. Delete Student
  const deleteStudentBtn = document.getElementById("delete-student-btn");
  if (deleteStudentBtn) {
    deleteStudentBtn.addEventListener("click", async () => {
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
  }

  // 4. Update Student
  const updateStudentBtn = document.getElementById("update-student-btn");
  if (updateStudentBtn) {
    updateStudentBtn.addEventListener("click", async () => {
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
  }

  
const viewRequestsBtn = document.getElementById("view-requests-btn")
if(viewRequestsBtn){
  viewRequestsBtn.addEventListener("click", async () => {
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
};

//function to retrieve residences matching all search parameters
document.getElementById("search-btn").addEventListener("click", async () => {
  const amenities = document.getElementById("amenities").value;
  const residenceGroup = document.getElementById("residence-group").value;
  const roomType = document.getElementById("room-types").value;

  if (!amenities || !residenceGroup || !roomType) {
    alert("Please select all fields before searching.");
    return;
  }

  const queryParams = new URLSearchParams({
    amenities,
    residence_group: residenceGroup,
    room_type: roomType,
  });

  try {
    const response = await fetch(`${API_BASE_URL}/residences?${queryParams}`);
    if (response.ok) {
      const residences = await response.json();
      console.log("API Response:", residences); // Log the response for debugging

      const resultDiv = document.getElementById("res-result");
      resultDiv.innerHTML = ""; // Clear previous results

      if (residences.length > 0) {
        residences.forEach((residence) => {
          console.log("Residence Object:", residence); // Log each residence object
          const residenceCard = document.createElement("div");
          residenceCard.className = "residence-card";
          residenceCard.innerHTML = `
  <h3>${residence.name || "No Name Available"}</h3>
  <p><strong>Amenities:</strong> ${residence.amenities || "No Amenities"}</p>
  <p><strong>Group:</strong> ${residence.residence_group || "No Group"}</p>
  <p><strong>Room Type:</strong> ${residence.room_type || "No Room Type"}</p>
  <p><strong>Address:</strong> ${
    residence.address || "No Address Available"
  }</p>
  <p><strong>Capacity:</strong> ${
    residence.capacity || "No Capacity Specified"
  }</p>
`;
          resultDiv.appendChild(residenceCard);
        });
      } else {
        resultDiv.innerHTML =
          "<p>No residences found matching the criteria.</p>";
      }
    } else {
      alert("Error fetching residences.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while fetching residences.");
  }
});

});

