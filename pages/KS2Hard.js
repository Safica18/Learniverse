import React, { useState, useEffect, useRef, useCallback } from "react"; // usestate stores changing data, useEffect runs code when page loads, useRef stores values without re-rendering, useCallback prevents function recreation
import { useNavigate } from "react-router-dom"; // helps navigate users around pages
import "./Index.css"; // links CSS

const TIME_LIMIT = 60; // sets timer limit to 60 seconds

function KS2Hard() { // this function creates the KS2 Hard rocket reasoning game

  const navigate = useNavigate(); // navigate around pages

  const [questions, setQuestions] = useState([]); // stores all game questions
  const [index, setIndex] = useState(0); // stores current question number
  const [answer, setAnswer] = useState(""); // stores student typed answer
  const [showTryAgain, setShowTryAgain] = useState(false); // try again button hidden when page loads

  const [usedHints, setUsedHints] = useState(0); // stores how many hints student used
  const [showHint1, setShowHint1] = useState(false); // first hint hidden when page loads
  const [showHint2, setShowHint2] = useState(false); // second hint hidden when page loads
  const [showHint3, setShowHint3] = useState(false); // third hint hidden when page loads

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT); // stores timer countdown
  const [score, setScore] = useState(0); // stores player score
  const [lives, setLives] = useState(3); // stores player lives

  const [loading, setLoading] = useState(true); // loading screen shown while fetching questions
  const [fetchError, setFetchError] = useState(null); // stores fetch errors

  const timerRef = useRef(null); // stores timer interval
  const scoreRef = useRef(0); // stores latest score value

  // image list for KS2 hard objects
  const imagesForObj = {
    fuel: "/imgs/KS2/fuel.png",
    star: "/imgs/KS2/star.png",
    planet: "/imgs/KS2/planet.png",
    rocket: "/imgs/KS2/rocket.png",
    alien: "/imgs/KS2/alien.png",
  };

  // gets correct image for object type
  const getImage = (type) => {
    const cleanType = (type || "fuel").toLowerCase().trim();
    return imagesForObj[cleanType] || "/imgs/KS2/fuel.png";
  };

  // keeps latest score updated
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // fetches questions from backend
  const fetchQuestions = useCallback(() => {
    setLoading(true); // shows loading message
    setFetchError(null); // clears old error message

    fetch(
      "http://localhost/learniverse_backend/get_questions.php?key_stage=KS2&level=hard"
    )
      .then((res) => {

        // checks if backend response is successful
        if (!res.ok) throw new Error("Network error");

        // converts backend response into javascript data
        return res.json();
      })

      // filters and randomises hard questions
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error(data.message || "Backend did not return a list");
        }

        const filtered = data.filter((q) => {
          const type = (q.type || "").toLowerCase().trim();
          const topic = (q.topic || "").toLowerCase().trim();

          // only keeps multi step total questions
          return topic === "multi_step" && type === "multi_step_total";
        });

        // shows error if no hard questions found
        if (filtered.length === 0) {
          throw new Error("No KS2 hard multi-step questions found.");
        }

        // randomises questions and selects 5 questions
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);

        setQuestions(selected); // saves selected questions
        setIndex(0); // starts from first question
        setScore(0); // resets score
        scoreRef.current = 0; // resets score reference
        setLives(3); // resets lives
        setAnswer(""); // clears answer box
        setShowTryAgain(false); // hides try again button
      })

      // stores backend or fetch error
      .catch((err) => setFetchError(err.message))

      // stops loading screen
      .finally(() => setLoading(false));
  }, []);

  // runs fetchQuestions when page loads
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // stores current question
  const question = questions[index];

  // resets values when new question loads
  useEffect(() => {
    if (!question) return;

    setAnswer(""); // clears answer box
    setShowTryAgain(false); // hides try again button

    setUsedHints(0); // resets hint count
    setShowHint1(false); // hides hint 1
    setShowHint2(false); // hides hint 2
    setShowHint3(false); // hides hint 3

    setTimeLeft(TIME_LIMIT); // resets timer
  }, [question]);

  // stops timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // saves final score attempt into database
  const saveAttempt = useCallback(
    async (finalScore) => {
      try {

        // gets student information from localstorage
        const student = JSON.parse(localStorage.getItem("student"));

        // gets student id from stored student data
        const student_id =
          student?.studentId ??
          student?.student_id ??
          localStorage.getItem("student_id");

        // stops saving if no student id found
        if (!student_id) {
          console.warn("No student_id found. Score not saved.");
          return;
        }

        // sends final score to backend
        await fetch("http://localhost/learniverse_backend/save_attemptsKS2.php", {
          method: "POST", // POST is used to send score data to backend
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: student_id,
            level: "hard",
            topic: "multi_step",
            score: finalScore,
            total_questions: questions.length,
            status: "completed",
          }),
        });
      } catch (error) {

        // shows save error in console
        console.error("Save KS2 Hard attempt error:", error);
      }
    },
    [questions.length]
  );

  // moves to next question or score page
  const nextQuestion = useCallback(
    async (finalScore = scoreRef.current) => {
      stopTimer();

      // moves to next question if there are questions left
      if (index + 1 < questions.length) {
        setIndex((prev) => prev + 1);
      } else {

        // saves final score before going to score page
        await saveAttempt(finalScore);

        navigate("/ScoreKS2", {
          state: {
            score: finalScore,
            total: questions.length,
            level: "hard",
            topic: "multi_step",
          },
        });
      }
    },
    [index, questions.length, navigate, stopTimer, saveAttempt]
  );

  // restarts the game level
  const restartLevel = useCallback(() => {
    stopTimer();

    setLives(3); // resets lives
    setScore(0); // resets score
    scoreRef.current = 0; // resets score reference
    setIndex(0); // goes back to first question
    setAnswer(""); // clears answer box
    setShowTryAgain(false); // hides try again button

    setUsedHints(0); // resets hint count
    setShowHint1(false); // hides hint 1
    setShowHint2(false); // hides hint 2
    setShowHint3(false); // hides hint 3

    setTimeLeft(TIME_LIMIT); // resets timer

    fetchQuestions(); // fetches new questions
  }, [fetchQuestions, stopTimer]);

  // removes a life when answer is wrong
  const loseLife = useCallback(() => {
    setLives((prev) => {
      const newLives = prev - 1;

      // restarts game if no lives left
      if (newLives <= 0) {
        alert("Game Over! Restarting mission.");
        restartLevel();
        return 3;
      }

      return newLives;
    });
  }, [restartLevel]);

  // timer system
  useEffect(() => {
    if (!question) return;

    stopTimer();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {

        // moves to next question when timer ends
        if (prev <= 1) {
          stopTimer();
          nextQuestion(scoreRef.current);
          return TIME_LIMIT;
        }

        return prev - 1; // decreases timer by 1 second
      });
    }, 1000);

    return () => stopTimer();
  }, [question, nextQuestion, stopTimer]);

  // shows selected hint
  const showHint = (hintNumber) => {
    if (hintNumber === 1 && !showHint1) {
      setShowHint1(true); // shows first hint
      setUsedHints((prev) => prev + 1); // increases hint count
    }

    if (hintNumber === 2 && !showHint2) {
      setShowHint2(true); // shows second hint
      setUsedHints((prev) => prev + 1); // increases hint count
    }

    if (hintNumber === 3 && !showHint3) {
      setShowHint3(true); // shows third hint
      setUsedHints((prev) => prev + 1); // increases hint count
    }
  };

  // checks if answer is correct
  const checkAnswer = () => {
    if (!question || answer === "" || showTryAgain) return;

    // correct answer from database question
    const correctAnswer = Number(question.target_value) || 0;

    if (Number(answer) === correctAnswer) {

      // increases score
      const newScore = scoreRef.current + 1;

      scoreRef.current = newScore;
      setScore(newScore);

      nextQuestion(newScore);
    } else {

      // lose life and show try again button
      loseLife();
      setShowTryAgain(true);
    }
  };

  // clears answer box and retries question
  const tryAgain = () => {
    setAnswer("");
    setShowTryAgain(false);
  };

  // loading screen
  if (loading) return <div>Loading mission...</div>;

  // fetch error screen
  if (fetchError) return <div>Error: {fetchError}</div>;

  // no question found screen
  if (!question) return <div>No KS2 hard questions found.</div>;

  return (
    <div className="KS2Game-bg">

      {/* top banner */}
      <div className="KS2TopBanner">

        <img
          src="/imgs/navigators/arrow2.png"
          className="KS2-back-arrow"
          alt="Back"
          onClick={() => navigate("/homeKS2")} // goes back to KS2 home page
        />

        <h1 className="KS2-title">Rocket Reasoning</h1>

        {/* shows life icons */}
        <div className="KS2-lives">
          {Array.from({ length: lives }).map((_, i) => (
            <img
              key={i}
              src="/imgs/navigators/life.png"
              alt="life"
              className="KS2-life-icon"
            />
          ))}
        </div>

        <div className="timer">Time: {timeLeft}</div>
      </div>

      {/* main game area */}
      <div className="KS2Game-main">

        <h2 className="KS2-question">{question.instruction_template}</h2>

        {/* main hard question card */}
        <div className="ks2-hard-main-card">
          <h3>Use the story and the picture to help you</h3>

          {/* shows objects from question */}
          <div className="ks2-hard-visual-row">
            {Array.from({
              length: Math.min(Number(question.value1) || 0, 20),
            }).map((_, i) => (
              <img
                key={i}
                src={getImage(question.object_name)}
                className="ks2-hard-object"
                alt={question.object_name || "object"}
              />
            ))}
          </div>

          {/* answer input box */}
          <div className="ks2-hard-answer-box">
            <h3>Type your answer</h3>

            <input
              id="ks2-hard-answer"
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter answer"
              className="ks2-hard-input"
              disabled={showTryAgain}
            />
          </div>
        </div>

        {/* try again button */}
        {showTryAgain && (
          <button className="KS2-next-btn" onClick={tryAgain}>
            Try Again
          </button>
        )}

        {/* hint section */}
        <div className="ks2-hint-panel">
          <h3>Need help? Check the hints</h3>

          <div className="ks2-hint-buttons">
            <button onClick={() => showHint(1)}>Hint</button>
            <button onClick={() => showHint(2)}>More Help</button>
            <button onClick={() => showHint(3)}>Booster</button>
          </div>

          {/* shows hints only when buttons are clicked */}
          {showHint1 && <p>{question.hint1}</p>}
          {showHint2 && <p>{question.hint2}</p>}
          {showHint3 && <p>{question.hint3}</p>}
        </div>

        {/* bottom buttons */}
        <div className="KS2-bottom-controls">
          <button className="KS2-back-btn" onClick={() => navigate("/homeKS2")}>
            Back
          </button>

          <button
            className="KS2-next-btn"
            onClick={checkAnswer}
            disabled={answer === "" || showTryAgain}
          >
            Next
          </button>
        </div>

        {/* shows score and hints used */}
        <div className="KS2-score">
          Score: {score} | Hints used: {usedHints}
        </div>
      </div>
    </div>
  );
}

export default KS2Hard;