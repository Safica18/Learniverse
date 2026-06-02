import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Index.css";

function ParentReg() {
  // this lets me move to another page
  const navigate = useNavigate();

  // stores all parent registration form details
  const [formData, setFormData] = useState({
    title: "",
    parentName: "",
    email: "",
    contactNumber: "",
    relationship: "",
    password: "",
    confirmPassword: "",
  });

  // updates the form when the user types or selects something
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // runs when the register form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    // checks if both the passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // sends parent registration data to the backend
      const response = await fetch(
        "http://localhost/learniverse_backend/parent_register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // gets response as text first so errors can be checked
      const text = await response.text();
      console.log("PHP RESPONSE:", text);

      let data;

      try {
        // changes backend response into JSON
        data = JSON.parse(text);
      } catch (error) {
        console.error("PHP returned invalid JSON:", text);
        alert("PHP error. Open Console to see the real problem.");
        return;
      }

      // if registration works, show parent id and go login page
      if (data.success) {
        alert(
          `Registered successfully!\nYour Parent ID: ${data.parentId}\nPlease use this ID to login.`
        );
        navigate("/parentlogin");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Could not connect to the backend.");
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
        <h2 className="subtitle">Parent Registration</h2>

        {/* parent registration form */}
        <form className="register-form" onSubmit={handleSubmit}>
          {/* title dropdown */}
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          >
            <option value="">Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Dr">Dr</option>
            <option value="Ms">Ms</option>
          </select>

          {/* parent name input */}
          <input
            type="text"
            name="parentName"
            placeholder="Parent Name"
            value={formData.parentName}
            onChange={handleChange}
            required
          />

          {/* email input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* phone number input */}
          <input
            type="tel"
            name="contactNumber"
            placeholder="Phone (+44)"
            value={formData.contactNumber}
            onChange={handleChange}
            maxLength={11}
            required
          />

          {/* relationship dropdown */}
          <select
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            required
          >
            <option value="">Relationship</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Guardian">Guardian</option>
          </select>

          {/* password input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* confirm password input */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* register and back buttons */}
          <div className="buttonCont">
            <button className="welcomeButton" type="submit">
              Register
            </button>

            <button
              className="welcomeButton"
              type="button"
              onClick={() => navigate("/register")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ParentReg;