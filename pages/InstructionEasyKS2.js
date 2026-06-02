import React, {useState} from "react"; // usestate helps changing data
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate helps navigate users around pages, useLocation gets data sent from another page
import "./Index.css"; // links CSS

function InstructionEasyKS2() { // this function shows the instruction page before the game starts

  const navigate = useNavigate(); // navigate around pages
  const location = useLocation(); // gets information passed from previous page
  const [showHowToPlay, setShowHowToPlay] = useState(false); // how to play popup hidden when page loads first

  // gets game information from location state, if not found it uses default values
  const {
    title = "Maths Planet Mission",
    subtitle = "Get ready to begin.",
    route = "/KS2Easy",
    totalQuestions = 5,
    lives = 3,
    level = "Easy"
  } = location.state || {};

  return (
    <div className="ks2-startPage">

      {/* title header */}
      <div className="ks2-Darkbg">
        <img
          src="/imgs/navigators/arrow2.png"
          alt="Back"
          className="ks2-startBack"
          onClick={() => navigate("/homeKS2")} // goes back to KS2 home page
        />

        <h1>{title}</h1>
      </div>

      {/* main instruction card */}
      <div className="ks2-startCard">
        <h2>{subtitle}</h2>

        {/* shows game information like level, questions and lives */}
        <div className="ks2-startInfo">
          <div className="ks2-startBox">
            <h3>Level</h3>
            <p>{level}</p>
          </div>

          <div className="ks2-startBox">
            <h3>Questions</h3>
            <p>{totalQuestions}</p>
          </div>

          <div className="ks2-startBox">
            <h3>Lives</h3>
            <p>{lives}</p>
          </div>
        </div>

        {/* short game instruction message */}
        <div className="ks2-startMessage">
         
          <p>Build the number using number blocks </p> <h1>(In 40 seconds)</h1>
        </div>

        {/* buttons for how to play, start and back */}
        <div className="ks2-start-buttons">

          <button
            className="ks2-howtoplay-btn"
            onClick={() => setShowHowToPlay(true)} // shows how to play popup
          >
            How to Play
          </button>

          <button
            className="ks2-start-btn"
            onClick={() => navigate(route)} // starts the game and goes to game page
          >
            Start
          </button>

          <button
            className="ks2-back-btn"
            onClick={() => navigate("/homeKS2")} // goes back to KS2 home page
          >
            Back
          </button>
        </div>
      </div>

      {/* how to play popup appears when button is clicked */}
       {showHowToPlay && (
        <div className="popupOverlay">
          <div className="popupBox ks2-howtoplay-popup">

            <h2>How to Play</h2>

            {/* game steps for the student */}
            <h1>Step 1:</h1> <p>Read the question.</p>
            <h1>Step 2:</h1> <p>Click a number block (on your left-hand side).</p>
            <h1>Step 3: </h1><p>It will appear in your space station (on your right-hand side).</p>
            <h1>Step 4:</h1> <p>Build the correct place value number.</p>
            <h1>Step 5:</h1> <p>Click next, to move to the next question .</p>

            <button onClick={() => setShowHowToPlay(false)}> 
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstructionEasyKS2;