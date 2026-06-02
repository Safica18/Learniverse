import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';

function ParentLogin() {
  // this lets me move to another page
  const navigate = useNavigate();

  // stores the parent login details
  const [formData, setFormData] = useState({
    parentId: '',
    password: ''
  });

  // updates the form when the user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // runs when the login form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // sends parent login details to backend
      const response = await fetch("http://127.0.0.1/learniverse_backend/parent_login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      // if login is correct, save parent id and go dashboard
      if (data.success) {
        localStorage.setItem("parentId", formData.parentId);
        alert(`Welcome ${data.parentName}!`);
        navigate("/parentDash");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Cannot reach backend. Is your server running?");
    }
  };

  return (
    <div className="pagebackground">
      {/* background clouds */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="cloud cloud4"></div>

      <div className="welcomeContainer">
        <h1 className="title">Learniverse</h1>
        <h2 className="subtitle">Parent Login</h2>

        {/* parent login form */}
        <form className="login-con" onSubmit={handleSubmit}>
          <input
            type="text"
            name="parentId"
            placeholder="Parent ID: eg. P12345"
            value={formData.parentId}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <p className="forgot-text">Forgot Password?</p>

          {/* login and back buttons */}
          <div className="buttonCont">
            <button className="welcomeButton" type="submit">Login</button>
            <button className="welcomeButton" type="button" onClick={() => navigate('/login')}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ParentLogin;