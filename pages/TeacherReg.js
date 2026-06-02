import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';

function TeacherReg() {
  const navigate = useNavigate(); // navigate through pages

  const [formData, setFormData] = useState({ // stores data in this form
    nameTitle: '',
    firstName: '',
    surname: '',
    email: '',
    yearGroup: '',
    password: '',
    confirmPassword: '',
    subjects: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/learniverse_backend/teacher_register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(`Registered successfully!\nTeacher ID: ${data.teacherId}`);
        navigate("/teacherlogin");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Cannot reach backend. Check XAMPP & PHP file.");
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
        <h2 className="subtitle">Teacher Registration </h2>
        {/* create a form to register students */}
        <form className="register-form" onSubmit={handleSubmit}>
          
          <select name="nameTitle" onChange={handleChange} required>
            <option value="">Title</option>
            <option value="Miss">Miss</option>
            <option value="Mrs">Mrs</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
          </select>
          
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email '@'" onChange={handleChange} required />

          <select name="subjects" onChange={handleChange} required>
            <option value="">Subject</option>
            <option value="1">Maths</option>
            <option value="2">Science</option>
            <option value="3">Writing</option>
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
          <div className="buttonCont">
            <button className="welcomeButton" type="submit">Register</button>
            <button className="welcomeButton" type="button" onClick={() => navigate('/register')}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherReg;