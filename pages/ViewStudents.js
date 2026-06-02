import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Index.css";

function ViewStudents() {

  const navigate = useNavigate();

  // stores students and teacher details
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState(null);

 
  useEffect(() => {
    // gets teacher data from local storage
    const teacherData = localStorage.getItem("teacherData");

    // if teacher is not logged redirect to login page
    if (!teacherData) {
      navigate("/teacherlogin");
      return;
    }

    try {
      // changes teacher data from text into object
      const parsedTeacher = JSON.parse(teacherData);
      setTeacher(parsedTeacher);

      // gets students for the teacher's year group
      fetch("http://localhost/learniverse_backend/get_students.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          yearGroup: parsedTeacher.yearGroup
        })
      })
        .then((res) => res.json())
        .then((data) => setStudents(data))
        .catch((err) => console.error("Error loading students:", err));
    } catch (error) {
      console.error("Error parsing teacherData:", error);
      navigate("/teacherlogin");
    }
  }, [navigate]);

  //  if the student is KS1 or KS2
  const getKeyStage = (year) => {
    return Number(year) <= 2 ? "KS1" : "KS2";
  };

  // loading message while teacher data is loading
  if (!teacher) return <p>Loading...</p>;

  return (
    <div className="teacher-page">
      {/* top header section */}
      <div className="teacher-header">
        <div className="header-left">
          <h1>View Students</h1>
          <p className="subtext">
            See all registered pupils in Year {teacher.yearGroup}.
          </p>
        </div>

        {/* teacher info box */}
        <div className="header-right">
          <div className="info-box">
            <p><strong>Teacher:</strong> {teacher.title} {teacher.teacherName}</p>
            <p><strong>Year Group:</strong> {teacher.yearGroup}</p>
          </div>
        </div>
      </div>

      <div className="main">
        <h2 className="section-title">Student List</h2>

        {/* students table */}
        <div className="students-table-wrap">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Year Group</th>
                <th>Key Stage</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                // goes through every student and shows their details
                students.map((student) => (
                  <tr key={student.student_id}>
                    <td>{student.student_id}</td>
                    <td>{student.student_name}</td>
                    <td>{student.year_group}</td>
                    <td>{getKeyStage(student.year_group)}</td>
                  </tr>
                ))
              ) : (
                // message if no students are found
                <tr>
                  <td colSpan="4">No students found for this year group.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* back button */}
        <div className="actions">
          <button onClick={() => navigate("/teacherDashboard")}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default ViewStudents;