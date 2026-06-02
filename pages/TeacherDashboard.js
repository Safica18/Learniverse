import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';

function TeacherDashboard() {
  // this lets me move to another page
  const navigate = useNavigate();

  // stores teacher details
  const [teacher, setTeacher] = useState(null);

  // runs when the dashboard opens
  useEffect(() => {
    // gets teacher data from local storage
    const teacherData = localStorage.getItem("teacherData");

    // if no teacher is logged in, go back to login
    if (!teacherData) {
      navigate("/teacherlogin");
      return;
    }

    try {
      // changes teacher data from text into object
      setTeacher(JSON.parse(teacherData));
    } catch (error) {
      console.error("Error parsing teacherData:", error);
      navigate("/teacherlogin");
    }
  }, [navigate]);

  // loading message while teacher data is being checked
  if (!teacher) return <p>Loading...</p>;

  return (
    <div className="teacher-page">
      {/* top section with teacher welcome message */}
      <div className="teacher-header">
        <div className="header-left">
          <h1>Welcome {teacher.title}. {teacher.teacherName}</h1>
          <p className="subtext">
            Manage your class and monitor children learning progress.
          </p>
        </div>

        {/* teacher year group info */}
        <div className="header-right">
          <div className="info-box">
            <p><strong>Year Group: </strong> {teacher.yearGroup}</p>
           
          </div>
        </div>
      </div>

      <div className="main">
        <h2 className="section-title">Class Overview</h2>

        {/* class stats cards */}
        <div className="stats">
          <div className="card yellow">
            <h3>Assigned To</h3>
            <p>20 Pupils</p>
          </div>

          <div className="card purple">
            <h3>Submitted By</h3>
            <p>19 Pupils</p>
          </div>

          <div className="card green">
            <h3>Feedback</h3>
            <p>10 Pupils</p>
          </div>
        </div>

        <h2 className="section-title">Quick Actions</h2>

        {/* teacher action buttons */}
        <div className="actions">
          <button onClick={() => navigate('/studentregister')}>
            Add Student
          </button>

          <button onClick={() => navigate('/assignhomework')}>
            Assign Homework
          </button>

          <button onClick={() => navigate('/viewstudents')}>
            View Students
          </button>

          {/* logout button clears teacher data */}
          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("teacherData");
              navigate('/');
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;