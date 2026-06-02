// StudentPortal.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentPortal() {
  const navigate = useNavigate();

  useEffect(() => {
    const studentData = localStorage.getItem("student");

    if (!studentData) {
      // Not logged in then redirect to login
      navigate("/studentlogin");
      return;
    }

    const student = JSON.parse(studentData);
    const year = Number(student.yearGroup);

    // Redirect based on year group
    if (year <= 2) {
      navigate("/homeKS1"); // KS1
    } else {
      navigate("/homeKS2"); // KS2
    }
  }, [navigate]);

  // while redircting
  return <p>Loading your dashboard...</p>;
}

export default StudentPortal;
