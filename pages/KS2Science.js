import React from "react";
import { useNavigate } from "react-router-dom";

function KS2Science() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center"
    }}>
      <h1> Coming Soon!</h1>
      <p>This feature will be available in a future update.</p>

      <button className="bck-btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
    </div>
  );
}

export default KS2Science;