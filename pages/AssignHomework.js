
import React, { useState, useEffect } from "react"; // usestate helps changing data, UseEffect runs the code when page loads
import { useNavigate } from "react-router-dom"; // helps navigate users around pages 
import "./Index.css"; // links CSS 

function AssignHomework() { // this function navigate for page redirection
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null); // stores teacher's logged in details

  // this saves the homework form input values 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    year_group: "",
    level: "",
    activity: "",
    due_date: ""
  });

  // this controls the preview homework if it's shown.
  const [showPreview, setShowPreview] = useState(false);


  // thi runs when the components loads
  useEffect(() => {
    const teacherData = localStorage.getItem("teacherData");

    // if no teacher data then navigate back to login 
    if (!teacherData) {
      navigate("/teacherlogin");
      return;
    }

    // this converts the teacher data from JSON into javascript 
    try {
      setTeacher(JSON.parse(teacherData));
    } catch (error) { //if the data is invalid send user back to login page
      console.error("Error parsing teacherData:", error);
      navigate("/teacherlogin");
    }
  }, [navigate]);

// this changes the form values when the user interacts with form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // this helps display the homework preivew 
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  // this reset the homework preview by clearing the data entered
  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      subject: "",
      year_group: "",
      level: "",
      activity: "",
      due_date: ""
    });
    
    
    setShowPreview(false);
  };

  // if no teacher found page says loading.
  if (!teacher) return <p>Loading...</p>;

  return (
    <div className="teacher-page">
      {/* Page title and header */}
      <div className="teacher-header">
        <div className="header-left">
          <h1>Assign Homework</h1>
          <p className="subtext">
            Plan a learning task for your class.
          </p>
        </div>

        <div className="header-right">
          <div className="info-box">
            <p><strong>Teacher:</strong> {teacher.title} {teacher.teacherName}</p>
            <p><strong>Year Group:</strong> {teacher.yearGroup}</p>
          </div>
        </div>
      </div>
       {/* homework form */}
      <div className="main assign-homework-layout">
        <form className="homework-form" onSubmit={handleSubmit}>
          <h2 className="section-title">Homework Details</h2>

           {/* Input data such as title of homework, subject, level etc.*/}
          <input
            type="text"
            name="title"
            placeholder="Homework Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
                 {/* drop downs */}
            <option value="">Select Subject</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="Writing">Writing</option>
          </select>

          <select
            name="year_group"
            value={formData.year_group}
            onChange={handleChange}
            required
          >
            <option value="">Select Year Group</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
            <option value="5">Year 5</option>
            <option value="6">Year 6</option>
          </select>

          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="">Select Level</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            required
          >
            <option value="">Select Activity</option>
            <option value="Counting Adventure">Counting Adventure</option>
            <option value="Basket Challenge">Basket Challenge</option>
            <option value="Counting Safari">Counting Safari</option>
            <option value="Place Value Planet">Place Value Planet</option>
            <option value="Arrays Planet">Arrays Planet</option>
            <option value="Rocket Reasoning Planet">Rocket Reasoning Planet</option>
          </select>

          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Add homework instructions for pupils"
            value={formData.description}
            onChange={handleChange}
            rows="5"
          />

          <div className="assign-homework-buttons">
            <button type="submit" className="assign-btn">
              Preview Homework
            </button>

            <button
              type="button"
              className="clear-btn"
              onClick={handleReset}
            >
              Clear
            </button>

            <button
              type="button"
              className="back-btn-teacher"
              onClick={() => navigate("/teacherDashboard")}
            >
              Back
            </button>
          </div>
        </form>

     {/* preview homework section */}
        <div className="homework-preview-card">
          <h2 className="section-title">Homework Preview</h2>

          {showPreview ? (
            <div className="preview-content">
              <div className="preview-badge-row">
                <span className="preview-badge">{formData.subject || "Subject"}</span>
                <span className="preview-badge">{formData.level || "Level"}</span>
                <span className="preview-badge">
                  {formData.year_group ? `Year ${formData.year_group}` : "Year Group"}
                </span>
              </div>

              <h3>{formData.title || "Homework Title"}</h3>

              <p><strong>Activity:</strong> {formData.activity || "Not selected"}</p>
              <p><strong>Due Date:</strong> {formData.due_date || "Not selected"}</p>

              <div className="preview-description">
                <strong>Instructions:</strong>
                <p>{formData.description || "No instructions added yet."}</p>
              </div>

              <div className="prototype-note">
                This is a homework planning preview. Task assignment and database saving
                can be added in a future version.
              </div>
            </div>
          ) : (
            <div className="preview-placeholder">
              <p>Fill in the form to preview the homework card here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignHomework;