
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';

function ParentDashboard() {
  // this lets me move to another page
  const navigate = useNavigate();

  // gets parent id from local storage
  const parentId = localStorage.getItem("parentId");

  // stores parent and children data
  const [parent, setParent] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [performance, setPerformance] = useState(null);

  // stores student id typed in add child box
  const [newStudentId, setNewStudentId] = useState("");

  // loads parent dashboard data when page opens
  useEffect(() => {
    // if parent is not logged in, send them back to login page
    if (!parentId) {
      navigate("/parentlogin");
      return;
    }

    // gets parent details and linked children from backend
    fetch("http://localhost/learniverse_backend/parentDash.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ parentId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setParent(data.parent);
          setStudents(data.students);
        } else {
          alert(data.message);
        }
      })
      .catch(() => alert("Please try again!"));

  }, [parentId, navigate]);

  // runs when parent clicks on a child card
  const handleStudentClick = (student) => {
    setSelectedStudent(student);

    // gets that child's performance from backend
    fetch("http://localhost/learniverse_backend/studentPerformance.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ student_id: student.student_id })
    })
      .then(res => res.json())
      .then(data => setPerformance(data));
  };

  // removes a child from the parent account
  const removeStudent = (student_id) => {
    fetch("http://localhost/learniverse_backend/removeChild.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ parent_id: parentId, student_id })
    })
      .then(res => res.json())
      .then(() => {
        // removes the child from the page list
        setStudents(students.filter(s => s.student_id !== student_id));

        // if removed child was selected, clear the performance box
        if (selectedStudent?.student_id === student_id) {
          setSelectedStudent(null);
          setPerformance(null);
        }
      });
  };

  // adds a new child using student id
  const addStudent = () => {
    if (!newStudentId) return;

    fetch("http://localhost/learniverse_backend/addChild.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        parent_id: parentId,
        student_id: newStudentId
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // adds new child to the list
          setStudents([...students, data.student]);
          setNewStudentId("");
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div className="parent-page">
      {/* top welcome section */}
      <div className="parent-header">
        <div className="parent-header-left">
          {parent && <h1>Welcome! {parent.title} {parent.parent_name}</h1>}
          <p className="parent-subtext">View your children’s learning progress and manage linked accounts.</p>
        </div>
      </div>

      <div className="parent-main">
        <h2 className="parent-title">Children’s Progress Dashboard</h2>

        {/* add child input box */}
        <div className="add-child-box">
          <input
            type="text"
            placeholder="Enter Student ID"
            value={newStudentId}
            onChange={(e) => setNewStudentId(e.target.value)}
          />
          <button onClick={addStudent}>Add Child</button>
        </div>

        <div className="parent-layout">
          {/* left side showing linked children */}
          <div className="children-panel">
            <h3 className="panel-title">Linked Children</h3>

            {students.length > 0 ? (
              <div className="children-list">
                {students.map(student => (
                  <div
                    key={student.student_id}
                    className={`student-card ${selectedStudent?.student_id === student.student_id ? "active-student" : ""}`}
                    onClick={() => handleStudentClick(student)}
                  >
                    <div className="student-info">
                      <h3>{student.first_name} {student.surname}</h3>
                      <p>Student ID: {student.student_id}</p>
                      <p>Year {student.year_group}</p>
                    </div>

                    {/* remove button for linked child */}
                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStudent(student.student_id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-text">No children linked yet.</p>
            )}
          </div>

          {/* right side showing progress */}
          <div className="progress-panel">
            <h3 className="panel-title">Performance Overview</h3>

            {selectedStudent && performance ? (
              <div className="performance-box">
                <h2>{selectedStudent.first_name}'s Maths Performance</h2>

                {/* progress bars for each difficulty */}
                <Progress label="Easy" value={performance.easy} />
                <Progress label="Medium" value={performance.medium} />
                <Progress label="Hard" value={performance.hard} />
              </div>
            ) : (
              <div className="placeholder-box">
                <p>Select a child to view their progress.</p>
              </div>
            )}
          </div>
        </div>

        {/* logout button */}
        <div className="parent-bottom-actions">
          <button className="back-btn-parent" onClick={() => navigate("/")}>
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}

/* progress component for showing percentage bar */
function Progress({ label, value }) {
  // changes progress bar colour based on score
  let color = "gray";
  if (value > 70) color = "green";
  else if (value > 30) color = "orange";

  return (
    <div className="progress-block">
      <div className="progress-label-row">
        <p>{label}</p>
        <span>{value}%</span>
      </div>

      {/* progress bar */}
      <div className="bar">
        <div className={`fill ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

export default ParentDashboard;