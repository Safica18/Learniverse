// imports needed for react, routing and css
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Index.css";

// time limit for each question
const TIME_LIMIT = 40;

function KS2Medium() {
  // this lets me move to another page
  const navigate = useNavigate();

  // main question states
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showTryAgain, setShowTryAgain] = useState(false);

  // hint states
  const [usedHints, setUsedHints] = useState(0);
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [showHint3, setShowHint3] = useState(false);

  // game stats
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  // loading and error states for backend
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // refs used for timer and keeping score updated
  const timerRef = useRef(null);
  const scoreRef = useRef(0);

  // images used in the array questions
  const objectImages = {
    alien: "/imgs/KS2/alien.png",
    rocket: "/imgs/KS2/rocket.png",
    star: "/imgs/KS2/star.png",
    planet: "/imgs/KS2/planet.png",
  };

  // keeps scoreRef the same as the score state
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // gets the questions from the backend
  const fetchQuestions = useCallback(() => {
    setLoading(true);
    setFetchError(null);

    fetch(
      "http://localhost/learniverse_backend/get_questions.php?key_stage=KS2&level=medium&topic=arrays&type=arrays_total"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.text();
      })
      .then((text) => {
        const cleanText = text.trim();

        // checks if backend sent nothing
        if (cleanText === "") {
          throw new Error("Backend returned empty response");
        }

        const data = JSON.parse(cleanText);

        // checks if the data is actually a list
        if (!Array.isArray(data)) {
          throw new Error("Backend did not return a question list");
        }

        // resets the level when questions load
        setQuestions(data.slice(0, 5));
        setIndex(0);
        setScore(0);
        scoreRef.current = 0;
        setLives(3);
        setSelectedAnswer(null);
        setShowTryAgain(false);
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // runs once when the page opens
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // gets the current question
  const question = questions[index];

  // makes 4 answer choices, with 1 correct and 3 random wrong ones
  const generateOptions = useCallback((correctAnswer) => {
    const correct = Number(correctAnswer);
    const choices = new Set([correct]);

    while (choices.size < 4) {
      const wrong = correct + Math.floor(Math.random() * 9) - 4;
      if (wrong > 0 && wrong !== correct) {
        choices.add(wrong);
      }
    }

    return Array.from(choices).sort(() => Math.random() - 0.5);
  }, []);

  // resets things whenever the question changes
  useEffect(() => {
    if (!question) return;

    setOptions(generateOptions(question.target_value));
    setSelectedAnswer(null);
    setShowTryAgain(false);

    setUsedHints(0);
    setShowHint1(false);
    setShowHint2(false);
    setShowHint3(false);
    setTimeLeft(TIME_LIMIT);
  }, [question, generateOptions]);

  // stops the timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // saves the final attempt to the backend
  const saveAttempt = useCallback(
    async (finalScore) => {
      try {
        const student = JSON.parse(localStorage.getItem("student"));

        const student_id =
          student?.studentId ??
          student?.student_id ??
          localStorage.getItem("student_id");

        // if no student id is found then it won't save
        if (!student_id) {
          console.warn("No student_id found. Score not saved.");
          return;
        }

        await fetch("http://localhost/learniverse_backend/save_attemptsKS2.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: student_id,
            level: "medium",
            topic: "arrays",
            score: finalScore,
            total_questions: questions.length,
            status: "completed",
          }),
        });
      } catch (error) {
        console.error("Save KS2 Medium attempt error:", error);
      }
    },
    [questions.length]
  );

  // moves to next question or score page if finished
  const nextQuestion = useCallback(
    async (finalScore = scoreRef.current) => {
      stopTimer();

      if (index + 1 < questions.length) {
        setIndex((prev) => prev + 1);
      } else {
        await saveAttempt(finalScore);

        navigate("/ScoreKS2", {
          state: {
            score: finalScore,
            total: questions.length,
            level: "medium",
            topic: "arrays",
          },
        });
      }
    },
    [index, questions.length, navigate, stopTimer, saveAttempt]
  );

  // restarts the whole level
  const restartLevel = useCallback(() => {
    stopTimer();

    setLives(3);
    setScore(0);
    scoreRef.current = 0;
    setIndex(0);
    setSelectedAnswer(null);
    setShowTryAgain(false);

    setUsedHints(0);
    setShowHint1(false);
    setShowHint2(false);
    setShowHint3(false);
    setTimeLeft(TIME_LIMIT);

    fetchQuestions();
  }, [fetchQuestions, stopTimer]);

  // takes away one life when the answer is wrong
  const loseLife = useCallback(() => {
    setLives((prev) => {
      const newLives = prev - 1;

      // if lives are finished then restart the mission
      if (newLives <= 0) {
        alert("Game Over! Restarting mission.");
        restartLevel();
        return 3;
      }

      return newLives;
    });
  }, [restartLevel]);

  // starts the timer for each question
  useEffect(() => {
    if (!question) return;

    stopTimer();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        // when time runs out it goes to the next question
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

  // shows hints when the user clicks the buttons
  const showHint = (hintNumber) => {
    if (hintNumber === 1 && !showHint1) {
      setShowHint1(true);
      setUsedHints((prev) => prev + 1);
    }

    if (hintNumber === 2 && !showHint2) {
      setShowHint2(true);
      setUsedHints((prev) => prev + 1);
    }

    if (hintNumber === 3 && !showHint3) {
      setShowHint3(true);
      setUsedHints((prev) => prev + 1);
    }
  };

  // checks if the answer chosen is right or wrong
  const checkAnswer = (selectedOption) => {
    if (!question || showTryAgain) return;

    setSelectedAnswer(selectedOption);

    const correctAnswer = Number(question.target_value);

    if (Number(selectedOption) === correctAnswer) {
      setTimeout(() => {
        const newScore = scoreRef.current + 1;
        scoreRef.current = newScore;
        setScore(newScore);
        nextQuestion(newScore);
      }, 500);
    } else {
      // wrong answer means losing a life
      loseLife();
      setShowTryAgain(true);
    }
  };

  // lets the user try the same question again
  const tryAgain = () => {
    setSelectedAnswer(null);
    setShowTryAgain(false);
  };

  // loading and error messages
  if (loading) return <div>Loading mission...</div>;
  if (fetchError) return <div>Error: {fetchError}</div>;
  if (!question) return <div>No KS2 medium array questions found.</div>;

  return (
    <div className="KS2Game-bg">
      {/* top section with back button, title, lives and timer */}
      <div className="KS2TopBanner">
        <img
          src="/imgs/navigators/arrow2.png"
          className="KS2-back-arrow"
          alt="Back"
          onClick={() => navigate("/homeKS2")}
        />

        <h1 className="KS2-title">Arrays Challenge</h1>

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

      <div className="KS2Game-main">
        {/* shows the question text */}
        <h2 className="KS2-question">{question.instruction_template}</h2>

        {/* shows the array image grid */}
        <div className="ks2-arrays-main-card">
          <p>Look carefully at the array</p>

          <div className="ks2-arrays-main-card">
            {Array.from({ length: Number(question.value1) }).map((_, row) => (
              <div className="ks2-array-row" key={row}>
                {Array.from({ length: Number(question.value2) }).map(
                  (_, col) => (
                    <img
                      key={col}
                      src={objectImages[question.object_name]}
                      alt={question.object_name}
                      className="ks2-array-object"
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* answer options */}
        <div className="ks2-answer-options">
          {options.map((option) => (
            <button
              key={option}
              className={`ks2-answer-card ${
                selectedAnswer === option ? "selected-answer-card" : ""
              }`}
              onClick={() => checkAnswer(option)}
              disabled={showTryAgain}
            >
              {option}
            </button>
          ))}
        </div>

        {/* try again button only shows after a wrong answer */}
        {showTryAgain && (
          <button className="KS2-next-btn" onClick={tryAgain}>
            Try Again
          </button>
        )}

        {/* hint section */}
        <div className="ks2-hint-panel">
          <h3>Need help? (check the hints)</h3>

          <div className="ks2-hint-buttons">
            <button onClick={() => showHint(1)}>Hint</button>
            <button onClick={() => showHint(2)}>More Help</button>
            <button onClick={() => showHint(3)}>Booster</button>
          </div>

          {showHint1 && <p>{question.hint1}</p>}
          {showHint2 && <p>{question.hint2}</p>}
          {showHint3 && <p>{question.hint3}</p>}
        </div>

        {/* bottom buttons */}
        <div className="KS2-bottom-controls">
          <button className="KS2-back-btn" onClick={() => navigate("/homeKS2")}>
            Back
          </button>

          <button className="KS2-next-btn" onClick={() => nextQuestion()}>
            Next
          </button>
        </div>

        {/* score and hints used */}
        <div className="KS2-score">
          Score: {score} | Hints used: {usedHints}
        </div>
      </div>
    </div>
  );
}

export default KS2Medium;