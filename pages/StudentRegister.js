import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';

function StudentRegister() {
  const navigate = useNavigate(); // navigate through pages

  const [formData, setFormData] = useState({ // stores data in this form
    firstName: '',
    surname: '',
    gender: '',
    yearGroup: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { // stores the frontend input data here
      alert(' Your Passwords is Incorrect');
      return;
    }
    const response = await fetch("http://localhost/learniverse_backend/student_register.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();

    if (data.success) {
      alert(`Your Registration has been successful! \n Student ID: ${data.studentId}`);
      navigate("/studentlogin");
    } else {
      alert("Your registration failed, please try agin!");
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
        <h2 className="subtitle">Student Registeration</h2>

        {/* create a form to register students */}
        <form className="register-form" onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required />
          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select name="yearGroup" onChange={handleChange} required>
            <option value="">Select Year Group</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
            <option value="5">Year 5</option>
            <option value="6">Year 6</option>
          </select>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />

             {/* submit register and back button*/}
          <div className="btn-StdReg">
            <button className="btn-std" type="submit">Register</button>
            <button className="btn-std" type="button" onClick={() => navigate('/register')}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentRegister;
