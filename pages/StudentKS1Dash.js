import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Index.css";

function StudentKS1Dash() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const studentData = localStorage.getItem("student");

    if (!studentData) {
      navigate("/studentlogin");
      return;
    }

    try {
      const studentObj = JSON.parse(studentData);
      setStudent(studentObj);

      // Redirect KS2 student
      if (Number(studentObj.yearGroup) > 3) {
        navigate("/homeKS2");
      }
    } catch (error) {
      console.error("Failed to parse student data:", error);
      navigate("/studentlogin");
    }
  }, [navigate]);

  if (!student) return <p>Loading...</p>;

  const avatarPath = student.avatar
    ? `/imgs/avatars_KS1/${student.avatar}`
    : "/imgs/avatars_KS1/Bee.png";

  return (
    <div className="pagebackground">
      {/* Top header */}
      <div className="Dark-bg">
        <div className="header-left">
          <h1>Welcome, {student.firstName}</h1>
          <p className="KS1welcome-subtext">Ready for today’s learning</p>
        </div>

        <div className="header-center">
          <button
            className="leaderBoard"
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </button>
        </div>

        <div className="KS1avatar"
          onClick={() => navigate("/AvatarKS1")} >
          <img
            src={avatarPath}
            alt="Student avatar"
            
            
          />
        </div>
      </div>

      {/* Main dashboard content */}
      <div className="dashboard">
        <div className="KS1dashboard-card">
          <h2 className="dashboard-title">{student.firstName}'s Dashboard</h2>
          <p className="KS1dashboard-subtitle">
            Choose a learning adventure. You are in Year {student.yearGroup}.
          </p>

          <div className="moduleCont">
            <button
              className="module-btn maths"
              onClick={() => navigate("/InstructionEasyKS1")}
            >
              Maths
            </button>

            <button
              className="module-btn science"
              onClick={() => navigate("/KS1Science")}
            >
              Science
            </button>

            <button
              className="module-btn writing"
              onClick={() => navigate("/KS1Writing")}
            >
              Writing
            </button>

            <button
              className="module-btn back"
              onClick={() => navigate("/")}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentKS1Dash;