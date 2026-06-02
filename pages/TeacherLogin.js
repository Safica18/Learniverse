import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';

function TeacherLogin() {
  const navigate = useNavigate(); // navigate through pages

  const [formData, setFormData] = useState({ // stores data in this form
    teacherId: '',
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
      const response = await fetch("http://127.0.0.1/learniverse_backend/teacher_login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });
    
    const data = await response.json();

    if (data.success) {
      // Store teacher data in localStorage for the dashboard
      localStorage.setItem('teacherData', JSON.stringify(data.teacherData));
      
      
      navigate("/teacherDashboard");
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
        <h2 className="subtitle">Teacher Login</h2>

      <form className="login-con" onSubmit={handleSubmit}>
        <input type="text" name="teacherId" placeholder="Teacher ID: eg.123445" onChange={handleChange} required />

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

export default TeacherLogin;
