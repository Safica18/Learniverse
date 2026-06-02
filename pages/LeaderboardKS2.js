// imports needed for react, navigation and css
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Index.css";

function LeaderboardKS2() {
  // this lets me move between pages
  const navigate = useNavigate();

  // stores selected key stage
  const [year, setYear] = useState("KS2");

  // stores leaderboard students data
  const [leaders, setLeaders] = useState([]);

  // loading state while backend data loads
  const [loading, setLoading] = useState(true);
  

  // runs every time the year changes
  useEffect(() => {
    setLoading(true);
    

    // fetches leaderboard data from backend
    fetch(`http://localhost/learniverse_backend/get_leaderboard.php?year=${year}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load leaderboard");
        return res.json();
      })
      .then((data) => {
        // checks if backend returned an error
        if (data.success === false) {
          throw new Error(data.message || "Leaderboard error");
        }

        // stores leaderboard data if it is an array
        setLeaders(Array.isArray(data) ? data : []);
      })
     
      .finally(() => {
        setLoading(false);
      });
  }, [year]);

  // gets only the top 3 students for the podium
  const topThree = leaders.slice(0, 3);

  // function to get the student avatar
  const getAvatar = (student) => {
    const avatar = student?.avatar;

    // if no avatar exists then use default avatar
    if (!avatar || avatar.trim() === "") {
      return year === "KS1"
        ? "/imgs/avatars_KS1/Bee.png"
        : "/imgs/avatars_KS2/img1.png";
    }

    // returns avatar path depending on key stage
    return year === "KS1"
      ? `/imgs/avatars_KS1/${avatar}`
      : `/imgs/avatars_KS2/${avatar}`;
  };

  // loading screen while waiting for backend
  if (loading) {
    return (
      <div className="leaderboard-page">
        <p>Loading leaderboard...</p>
      </div>
    );
  }


  return (
    <div className="leaderboard-page">
      {/* top section with heading and back button */}
      <div className="leaderboard-header">
        <h1>{year} Leaderboard</h1>

        <button className="leaderboard-back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      {/* buttons to switch between KS1 and KS2 */}
      <div className="leaderboard-filter-row">
        <button
          className={`leaderboard-filter-btn ${
            year === "KS1" ? "active-filter" : ""
          }`}
          onClick={() => setYear("KS1")}
        >
          KS1
        </button>

        <button
          className={`leaderboard-filter-btn ${
            year === "KS2" ? "active-filter" : ""
          }`}
          onClick={() => setYear("KS2")}
        >
          KS2
        </button>
      </div>

      {/* podium section for top 3 players */}
      {topThree.length > 0 && (
        <div className="podium-container">

          {/* second place student */}
          {topThree[1] && (
            <div className="podium second">
              <div className="podium-rank">2</div>

              <img
                src={getAvatar(topThree[1])}
                alt={topThree[1].name}
                className="podium-avatar"
                onError={(e) => {
                  // fallback image if avatar fails to load
                  e.currentTarget.src =
                    year === "KS1"
                      ? "/imgs/avatars_KS1/Bee.png"
                      : "/imgs/avatars_KS2/img1.png";
                }}
              />

              <h3>{topThree[1].name}</h3>

              {/* total score */}
              <p className="podium-total">
                Total: {topThree[1].total_score}pts
              </p>
            </div>
          )}

          {/* first place student */}
          {topThree[0] && (
            <div className="podium first">
              <div className="podium-rank">1</div>

              <img
                src={getAvatar(topThree[0])}
                alt={topThree[0].name}
                className="podium-avatar"
                onError={(e) => {
                  e.currentTarget.src =
                    year === "KS1"
                      ? "/imgs/avatars_KS1/Bee.png"
                      : "/imgs/avatars_KS2/img1.png";
                }}
              />

              <h3>{topThree[0].name}</h3>

              {/* total score */}
              <p className="podium-total">
                Total: {topThree[0].total_score}pts
              </p>
            </div>
          )}

          {/* third place student */}
          {topThree[2] && (
            <div className="podium third">
              <div className="podium-rank">3</div>

              <img
                src={getAvatar(topThree[2])}
                alt={topThree[2].name}
                className="podium-avatar"
                onError={(e) => {
                  e.currentTarget.src =
                    year === "KS1"
                      ? "/imgs/avatars_KS1/Bee.png"
                      : "/imgs/avatars_KS2/img1.png";
                }}
              />

              <h3>{topThree[2].name}</h3>

              {/* total score */}
              <p className="podium-total">
                Total: {topThree[2].total_score}pts
              </p>
            </div>
          )}
        </div>
      )}

      {/* leaderboard table */}
      <div className="leaderboard-table-wrap">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Key Stage</th>
              <th>Easy</th>
              <th>Medium</th>
              <th>Hard</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {/* loops through all students */}
            {leaders.map((student, index) => (
              <tr key={student.student_id}>
                {/* ranking number */}
                <td>{index + 1}</td>

                <td>
                  <img
                    src={getAvatar(student)}
                    alt={student.name}
                    className="leaderboard-table-avatar"
                    onError={(e) => {
                      // fallback image if avatar breaks
                      e.currentTarget.src =
                        year === "KS1"
                          ? "/imgs/avatars_KS1/Bee.png"
                          : "/imgs/avatars_KS2/img1.png";
                    }}
                  />
                </td>

                {/* student details */}
                <td>{student.name}</td>
                <td>{student.level}</td>
                <td>{student.easy_points}/5</td>
                <td>{student.medium_points}/5</td>
                <td>{student.hard_points}/5</td>
                <td>{student.total_score}/15</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* message if no data exists */}
      {leaders.length === 0 && <p>No leaderboard data found.</p>}
    </div>
  );
}

export default LeaderboardKS2;