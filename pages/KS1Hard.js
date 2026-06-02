import React, { useState, useEffect, useRef, useCallback } from "react"; // usestate stores changing data, useEffect runs code when page loads, useRef stores values without re-rendering, useCallback prevents function recreation
import { useNavigate } from "react-router-dom"; // helps navigate users around pages
import "./Index.css"; // links CSS

const TIME_LIMIT = 60; // sets timer limit to 60 seconds

function KS1Hard({ level = "hard" }) { // this function creates the KS1 Hard game

  const navigate = useNavigate(); // navigate around pages

  const [questions, setQuestions] = useState([]); // stores all game questions
  const [index, setIndex] = useState(0); // stores current question number
  const [answer, setAnswer] = useState(""); // stores student answer
  const [showTryAgain, setShowTryAgain] = useState(false); // try again button hidden when page loads

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT); // stores timer countdown
  const [lives, setLives] = useState(3); // stores player lives
  const [score, setScore] = useState(0); // stores player score

  const [loading, setLoading] = useState(true); // loading screen shown while fetching questions
  const [fetchError, setFetchError] = useState(null); // stores fetch errors

  const timerRef = useRef(null); // stores timer interval
  const timerSoundRef = useRef(null); // stores timer sound
  const scoreRef = useRef(0); // stores latest score value

  // keeps latest score updated
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // fetches questions from backend
  const fetchQuestions = useCallback(() => {
    setLoading(true);
    setFetchError(null);

    fetch(
      "http://localhost/learniverse_backend/get_questions.php?key_stage=KS1&level=hard"
    )
      .then((res) => {

        // shows error if response  from network fails
        if (!res.ok) throw new Error("Network error");

        return res.json();
      })

      // filters and randomises hard questions
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error(data.message || "Invalid question data");
        }

        const filtered = data.filter((q) => {
          const type = (q.type || "").toLowerCase().trim();

          // only allows selected question types
          return [
            "addition_total",
            "subtraction_remaining",
            "addition_missing_number",
          ].includes(type);
        });

        // randomises question order
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());

        setQuestions(shuffled.slice(0, 5)); // selects only 5 questions
        setIndex(0);
        setAnswer("");
        setShowTryAgain(false);
        setScore(0);
        scoreRef.current = 0;
        setLives(3);
        setTimeLeft(TIME_LIMIT);
      })

      // shows fetch errors
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

  // resets answer box and timer when question changes
  useEffect(() => {
    setAnswer("");
    setShowTryAgain(false);
    setTimeLeft(TIME_LIMIT);
  }, [index]);

  // stops timer and sound
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (timerSoundRef.current) {
      timerSoundRef.current.pause();
      timerSoundRef.current.currentTime = 0;
    }
  }, []);

  // saves final score attempt into database
  const saveFinalAttempt = useCallback(
    async (finalScore) => {
      try {

        // gets student information from localstorage
        const student = JSON.parse(localStorage.getItem("student"));

        const student_id =
          student?.studentId ??
          student?.student_id ??
          localStorage.getItem("student_id");

        // stops saving if no student id found
        if (!student_id) {
          console.warn("No student_id found. KS1 Hard score not saved.");
          return;
        }

        await fetch("http://localhost/learniverse_backend/Save_attempts.php", {
          method: "POST", // sends score data to backend
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            student_id,
            level: "hard",
            score: finalScore,
            total_questions: questions.length,
            status: "completed",
          }),
        });

      } catch (error) {

        // shows save errors
        console.error("Save KS1 Hard final attempt error:", error);
      }
    },
    [questions.length]
  );

  // moves to next question or score page
  const nextQuestion = useCallback(
    async (finalScore = scoreRef.current) => {

      stopTimer();
      setAnswer("");
      setShowTryAgain(false);

      // moves to next question if available
      if (index + 1 < questions.length) {
        setIndex((prev) => prev + 1);

      } else {

        // saves final score and moves to score page
        await saveFinalAttempt(finalScore);

        navigate("/ScoreKS1", {
          state: {
            score: finalScore,
            total: questions.length,
            level: "hard",
          },
        });
      }
    },
    [index, questions.length, navigate, stopTimer, saveFinalAttempt]
  );

  // timer system
  useEffect(() => {
    if (!question) return;

    stopTimer();

    // creates timer sound
    timerSoundRef.current = new Audio("/mp3/timer.mp3");

    timerRef.current = setInterval(() => {

      setTimeLeft((prev) => {

        // plays warning sound at 14 seconds
        if (prev === 14) {
          timerSoundRef.current?.play().catch(() => {});
        }

        // moves to next question when timer ends
        if (prev <= 1) {
          stopTimer();
          nextQuestion(scoreRef.current);
          return TIME_LIMIT;
        }

        return prev - 1;
      });

    }, 1000);

    return () => stopTimer();

  }, [question, nextQuestion, stopTimer]);

  // restarts the game level
  const restartLevel = useCallback(() => {

    stopTimer();
    setLives(3);
    setScore(0);
    scoreRef.current = 0;
    setIndex(0);
    setTimeLeft(TIME_LIMIT);
    setAnswer("");
    setShowTryAgain(false);

    fetchQuestions();

  }, [fetchQuestions, stopTimer]);

  // removes a life when answer is wrong
  const loseLife = useCallback(() => {

    setLives((prev) => {

      const newLives = prev - 1;

      // restart game if no lives left
      if (newLives <= 0) {
        alert("Game Over! Restarting level.");
        restartLevel();
        return 3;
      }

      return newLives;
    });

    setShowTryAgain(true);

  }, [restartLevel]);

  // checks if answer is correct
  const checkAnswer = useCallback(() => {

    if (!question || answer === "" || showTryAgain) return;

    const type = (question.type || "").toLowerCase();

    const startValue = Number(question.start_value ?? question.value1 ?? 0);
    const targetValue = Number(question.target_value ?? 0);
    const userAnswer = Number(answer);

    let correctAnswer = targetValue;

    // calculates missing number answer
    if (type === "addition_missing_number") {
      correctAnswer = targetValue - startValue;
    }

    // checks if student answer is correct
    const correct = userAnswer === correctAnswer;

    if (correct) {

      // increases score
      const newScore = scoreRef.current + 1;

      scoreRef.current = newScore;
      setScore(newScore);

      nextQuestion(newScore);

    } else {

      // lose life if answer wrong
      loseLife();
    }

  }, [answer, question, nextQuestion, loseLife, showTryAgain]);

  // clears answer box and retries question
  const tryAgain = () => {
    setAnswer("");
    setShowTryAgain(false);
  };

  // loading screen
  if (loading) return <div>Loading questions...</div>;

  // fetch error screen
  if (fetchError) return <div>Error: {fetchError}</div>;

  // no question found screen
  if (!question) return <div>No hard questions found.</div>;

  return (
    <div className="CountingGame-bg">

      {/* top dark background */}
      <div className="CountingGame-Darkbg">

        <img
          src="/imgs/navigators/arrow_left.png"
          className="back-arrow"
          alt="back"
          onClick={() => navigate("/homeKS1")} // goes back to KS1 home page
        />

        {/* top banner */}
        <div className="topBanner">

          <div className="topBanner-left">
            <h1>Counting Safari</h1>
          </div>

          {/* shows lives and timer */}
          <div className="topBanner-right">

            <div className="KS1-lives">

              {/* creates life icons */}
              {Array.from({ length: lives }).map((_, i) => (
                <img
                  key={i}
                  src="/imgs/navigators/life.png"
                  alt="life"
                  className="KS1-life-icon"
                />
              ))}
            </div>

            <div className="timerKS1">Time: {timeLeft}</div>
          </div>
        </div>
      </div>

      {/* main game area */}
      <div className="gameMain">

        <h2 className="question-text">
          {question.instruction_template} Enter your answer in the box below.
        </h2>

        {/* answer input section */}
        <div className="answer-box hard-answer-box">

          <h3>Your Answer</h3>

          <p className="answer-help-text">Type the answer below.</p>

          <input
            type="number"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="hard-answer-input"
            disabled={showTryAgain}
          />
        </div>

        {/* try again button */}
        {showTryAgain && (
          <button className="KS1-next-btn" onClick={tryAgain}>
            <p>Try Again</p>
          </button>
        )}

        {/* bottom buttons */}
        <div className="KS1-bottom-controls">

          <button
            className="KS1-back-btn"
            onClick={() => navigate("/homeKS1")}
          >
            <p>Back</p>
          </button>

          <button
            className="KS1-next-btn"
            onClick={checkAnswer}
            disabled={answer === "" || showTryAgain}
          >
            <p>Next</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default KS1Hard;