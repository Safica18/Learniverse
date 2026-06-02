import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';

function StudentLogin() {
  const navigate = useNavigate(); // navigate through pages

  const [formData, setFormData] = useState({ // stores data in this form
    studentId: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

     const handleSubmit =async (e) => {
    e.preventDefault();

    try{
      const response = await fetch("http://localhost/learniverse_backend/student_login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });
    
    const data = await response.json();

    if (data.success) {

      localStorage.setItem(
        "student",
        JSON.stringify({
          studentId: data.studentId,
          firstName: data.firstName,
          yearGroup: data.yearGroup
        })
      );
      
      
      const year = Number(data.yearGroup);
      if (year <= 3) {
        navigate("/homeKS1");
      } else {
        navigate("/homeKS2")
      }
    } else {
      alert(data.message);
    } 

    } catch (error) {
      console.error("Fetch error:", error);
      alert("cannot find data");
    }
  };

  return (
     
    <div className="pagebackground">
      {/* Clouds */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="cloud cloud4"></div>

      {/* Form */}
      <div className="welcomeContainer">
        <h1 className="title">Learniverse</h1>
        <h2 className="subtitle">Student Login</h2>

      <form className="login-con" onSubmit={handleSubmit}>
        <input type="text" name="studentId" placeholder="Student ID: eg.123445" onChange={handleChange} required />

        <input type="password" name="password" placeholder="Password:" onChange={handleChange} required/>

        <p className="forgot-text">Forget Password?</p>

        <button className="login-btn" type="submit">
          Login
        </button>
        <button className="bck-btn" onClick={() => navigate('/login')}>
            Back
          </button>
      </form>
    </div>
    </div>
  );
}

export default StudentLogin;
