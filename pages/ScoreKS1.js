import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Index.css";

function ScoreKS1() {
  // this lets me move to another page
  const navigate = useNavigate();

  // this gets the score data sent from the game page
  const location = useLocation();

  // gets score details, or uses default values if missing
  const score = location.state?.score || 0;
  const total = location.state?.total || 5;
  const level = location.state?.level || "easy";
  const percentage = total > 0 ? (score / total) * 100 : 0;

  // gets the logged in student from local storage
  const student = JSON.parse(localStorage.getItem("student"));

  // routes for retrying the same level
  const retryRoutes = {
    easy: "/KS1Easy",
    medium: "/KS1Medium",
    hard: "/KS1Hard",
  };

  // routes for going to the next level
  const nextRoutes = {
    easy: "/InstructionMediumKS1",
    medium: "/InstructionHardKS1",
    hard: "/homeKS1",
  };

  // saves the attempt when the score page loads
  useEffect(() => {
    const saveAttempt = async () => {
      try {
        const studentData = JSON.parse(localStorage.getItem("student"));

        // checks if student id exists
        if (!studentData?.studentId && !studentData?.student_id) {
          console.error("No student ID found in localStorage.");
          return;
        }

        const studentId = studentData.studentId || studentData.student_id;

        // sends score attempt to backend
        const response = await fetch(
          "http://localhost/learniverse_backend/save_attempts.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              student_id: studentId,
              level: level.toLowerCase(),
              score: score,
              total_questions: total,
              percentage: percentage,
              status: "completed",
            }),
          }
        );

        const data = await response.json();
        console.log("KS1 attempt saved:", data);

        // logs error if backend save failed
        if (!data.success) {
          console.error("Save attempt failed:", data);
        }
      } catch (error) {
        console.error("Save attempt fetch error:", error);
      }
    };

    saveAttempt();
  }, [level, score, total, percentage]);

  // sends user back to the same level
  function retryLevel() {
    navigate(retryRoutes[level] || "/homeKS1");
  }

  // updates level and moves user to next level
  async function nextLevel() {
    let nextLevelValue = "";

    // works out what the next level should be
    if (level === "easy") nextLevelValue = "medium";
    else if (level === "medium") nextLevelValue = "hard";
    else nextLevelValue = "complete";

    try {
      const studentId = student?.studentId || student?.student_id;

      // updates student level in backend
      await fetch("http://localhost/learniverse_backend/Update_level.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          level: nextLevelValue,
        }),
      });
    } catch (error) {
      console.error("Level update failed:", error);
    }

    navigate(nextRoutes[level] || "/homeKS1");
  }

  return (
    <div className="resultPageKS1">
      <h1>Level Complete</h1>

      <h2>Your Score</h2>

      {/* score box */}
      <div className="scoreBoxKS1">
        {score} / {total}
      </div>

      {/* pass or fail message */}
      {percentage >= 80 ? (
        <p className="passText">Great job! You passed!</p>
      ) : (
        <p className="failText">Try again to reach 80%!</p>
      )}

      {/* result page buttons */}
      <div className="resultButtons">
        <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
        <button onClick={nextLevel}>Next Level</button>
        <button onClick={retryLevel}>Retry</button>
        <button onClick={() => navigate("/homeKS1")}>Home</button>
      </div>
    </div>
  );
}

export default ScoreKS1;