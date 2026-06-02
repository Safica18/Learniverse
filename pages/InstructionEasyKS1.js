import React, {useState} from "react"; // usestate helps changing data
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate helps navigate users around pages, useLocation gets data sent from another page
import "./Index.css"; // links CSS

function InstructionEasyKS1() { // this function shows the instruction page before the game starts

  const navigate = useNavigate(); // navigate around pages
  const location = useLocation(); // gets information passed from the previous page
  const [showHowToPlay, setShowHowToPlay] = useState(false); // how to play popup is hidden when page loads first

  // gets game information from location state, if not found it uses default values
  const {
    title = "Maths Adventure",
    subtitle = "Ready to begin?",
    route = "/KS1Easy",
    totalQuestions = 5,
    lives = 3,
    level = "Easy"
  } = location.state || {};

  return (
    <div className="ks1-startpage">

      {/* title header */}
      <div className="ks1-startheader">
        <img
          src="/imgs/navigators/arrow_left.png"
          alt="Back"
          className="ks1-startbackarrow"
          onClick={() => navigate("/homeKS1")} // goes back to KS1 home page
        />

        <h1>{title}</h1>
      </div>

      {/* main instruction card */}
      <div className="ks1-startCard">
        <h2>{subtitle}</h2>

        {/* shows game information like level, questions and lives */}
        <div className="ks1-startInfo">
          <div className="ks1-startBox">
            <h3>Level</h3>
            <p>{level}</p>
          </div>

          <div className="ks1-startBox">
            <h3>Questions</h3>
            <p>{totalQuestions}</p>
          </div>

          <div className="ks1-startBox">
            <h3>Lives</h3>
            <p>{lives}</p>
          </div>
        </div>

        {/* short message explaining the game task */}
        <div className="ks1-startMessage">
         <p>Drag and Drop object in the basket </p> <h1>(In 50 seconds)</h1>
        </div>

        {/* buttons for how to play, start and back */}
        <div className="ks1-startButtons">
          <button
            className="ks2-howtoplay-btn"
            onClick={() => setShowHowToPlay(true)} // shows how to play (popup)
          >
            How to Play
          </button>

          <button
            className="ks1-start-btn"
            onClick={() => navigate(route)} // starts the game and goes to game page
          >
            Start
          </button>

          <button
            className="ks1-back-btn"
            onClick={() => navigate("/homeKS1")} // goes back to KS1 home page
          >
            Back
          </button>
        </div>
      </div>

      {/* how to play popup appears when button is clicked */}
      {showHowToPlay && (
        <div className="popupOverlay">
          <div className="popupBox ks1-howtoplay-popup">
            <h2>How to Play</h2>

            {/* game steps for the student */}
            <h1>Step 1:</h1> <p>Read the question.</p>
            <h1>Step 2: </h1><p>Drop an object one by one into the basket.</p>
            <h1>Step 3:</h1> <p>Drop correct number of an object into the basket.</p>
            <h1>Step 4:</h1> <p>If unsure use the hints button at the bottom.</p>
            <h1>Step 4:</h1> <p>Click next, to move to the next question .</p>

            <button onClick={() => setShowHowToPlay(false)}> 
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstructionEasyKS1;