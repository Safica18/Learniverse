import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Index.css";

function StudentKS2Dash() {
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

      // Redirect KS1 pupils away from KS2 dashboard
      if (Number(studentObj.yearGroup) <= 2) {
        navigate("/homeKS1");
      }
    } catch (error) {
      console.error("Failed to parse student data:", error);
      navigate("/studentlogin");
    }
  }, [navigate]);

  if (!student) return <p>Loading...</p>;

  const avatarPath = student.avatar  // default image once logined to the page
    ? `/imgs/avatars_KS2/${student.avatar}`
    : "/imgs/avatars_KS2/img1.png";

  return (
    <div className="KS2pagebackground">
      {/* Top header */}
      <div className="KS2Dark-bg">
        <div className="KS2header-left">
          <h1>Welcome, {student.firstName}</h1>
          <p className="KS2welcome-subtext">Ready for today's learning</p>
        </div>

        <div className="KS2header-center">
          <button
            className="KS2leaderBoard"
            onClick={() => navigate("/LeaderboardKS2")}
          >
            Leaderboard
          </button>
        </div>

        <div className="KS2avatar"
          onClick={() => navigate("/AvatarKS2")} >

          <img
            src={avatarPath}
            alt="Student avatar"
          
            
          />
        </div>
      </div>

      {/* Main dashboard content */}
      <div className="KS2dashboard">
        <div className="KS2dashboard-card">
          <h2 className="KS2dashboard-title">{student.firstName}'s Dashboard</h2>
          <p className="KS2dashboard-subtitle">
            Choose a learning module. You are in Year {student.yearGroup}.
          </p>

          <div className="KS2moduleCont">
            <button
              className="KS2module-btn maths"
              onClick={() => navigate("/InstructionEasyKS2")}
            >
              Maths
            </button>

            <button
              className="KS2module-btn science"
              onClick={() => navigate("/KS2Science")}
            >
              Science
            </button>

            <button
              className="KS2module-btn writing"
              onClick={() => navigate("/KS2Writing")}
            >
              Writing
            </button>

            <button
              className="KS2module-btn KS2back-btn"
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

export default StudentKS2Dash;