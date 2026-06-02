import React, { useState, useEffect, useRef, useCallback } from "react"; // usestate stores changing data, useEffect runs code when page loads, useRef stores values without re-rendering, useCallback prevents function recreation
import { useNavigate } from "react-router-dom"; // helps navigate users around pages
import "./Index.css"; // links CSS

const TIME_LIMIT = 40; // sets timer limit to 40 seconds

function KS2Easy() { // this function creates the KS2 Easy place value game

  const navigate = useNavigate(); // navigate around pages

  const [questions, setQuestions] = useState([]); // stores all game questions
  const [index, setIndex] = useState(0); // stores current question number

  const [hundreds, setHundreds] = useState(0); // stores number of hundreds selected
  const [tens, setTens] = useState(0); // stores number of tens selected
  const [ones, setOnes] = useState(0); // stores number of ones selected
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

  // image list for place value blocks
  const placeValueImages = {
    hundred: "/imgs/KS2/hundreds.png",
    ten: "/imgs/KS2/ten.png",
    one: "/imgs/KS2/one.png",
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
      "http://localhost/learniverse_backend/get_questions.php?key_stage=KS2&level=easy"
    )
      .then((res) => {

        // checks if backend response is successful
        if (!res.ok) throw new Error("Network error");

        // gets backend response as text
        return res.text();
      })
      .then((text) => {

        // shows backend response in console for checking
        console.log("KS2 easy level response:", text);

        // removes spaces and unwanted # symbol from backend response
        const cleanText = text.trim().replace(/^#/, "");

        // checks if backend response is empty
        if (cleanText === "") {
          throw new Error("Backend returned empty response");
        }

        // converts backend response from text into javascript data
        const data = JSON.parse(cleanText);

        // checks if backend returned a list of questions
        if (!Array.isArray(data)) {
          throw new Error("Backend did not return a question list");
        }

        // only keeps place value questions
        const filtered = data.filter((q) => {
          const topic = (q.topic || "").toLowerCase().trim();
          return topic === "place_value";
        });

        // randomises questions and selects 5 questions
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);

        setQuestions(selected); // saves selected questions
        setIndex(0); // starts from first question
        setScore(0); // resets score
        scoreRef.current = 0; // resets score reference
        setLives(3); // resets lives
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

    setHundreds(0); // resets hundreds
    setTens(0); // resets tens
    setOnes(0); // resets ones
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
            level: "easy",
            topic: "place_value",
            score: finalScore,
            total_questions: questions.length,
            status: "completed",
          }),
        });
      } catch (error) {

        // shows save error in console
        console.error("Saving KS2 Easy attempt error:", error);
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
            level: "easy",
            topic: "place_value",
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

    setHundreds(0); // resets hundreds
    setTens(0); // resets tens
    setOnes(0); // resets ones
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
    if (!question || showTryAgain) return;

    // correct values from database question
    const correctHundreds = Number(question.value1) || 0;
    const correctTens = Number(question.value2) || 0;
    const correctOnes = Number(question.target_value) || 0;

    // checks if selected hundreds, tens and ones match the correct answer
    const correct =
      hundreds === correctHundreds &&
      tens === correctTens &&
      ones === correctOnes;

    if (correct) {

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

  // clears selected blocks and retries question
  const tryAgain = () => {
    setHundreds(0);
    setTens(0);
    setOnes(0);
    setShowTryAgain(false);
  };

  // loading screen
  if (loading) return <div>Loading mission...</div>;

  // fetch error screen
  if (fetchError) return <div>Error: {fetchError}</div>;

  // no question found screen
  if (!question) return <div>No KS2 place value questions found.</div>;

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

        <h1 className="KS2-title">Place Value Mission</h1>

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

        <h2 className="KS2-instruction">
          Answer question by clicking the number blocks
        </h2>

        <h2 className="KS2-question">
          Question: {question.instruction_template}
        </h2>

        {/* place value builder section */}
        <div className="ks2-place-value-builder">

          {/* block buttons section */}
          <div className="ks2-tool-panel">
            <h3>Build your number</h3>

            <button
              className="ks2-block-button"
              onClick={() => setHundreds((prev) => prev + 1)}
              disabled={showTryAgain}
            >
              <img src={placeValueImages.hundred} alt="Hundred block" />
              <span>Add 100</span>
            </button>

            <button
              className="ks2-block-button"
              onClick={() => setTens((prev) => prev + 1)}
              disabled={showTryAgain}
            >
              <img src={placeValueImages.ten} alt="Ten block" />
              <span>Add 10</span>
            </button>

            <button
              className="ks2-block-button"
              onClick={() => setOnes((prev) => prev + 1)}
              disabled={showTryAgain}
            >
              <img src={placeValueImages.one} alt="One block" />
              <span>Add 1</span>
            </button>
          </div>

          {/* displays selected hundreds, tens and ones */}
          <div className="ks2-display-panel">
            <h3>Your space station</h3>

            <div className="ks2-column">
              <p>Hundreds: {hundreds}</p>
              <button onClick={() => setHundreds(0)} disabled={showTryAgain}>
                Reset Hundreds
              </button>
            </div>

            <div className="ks2-column">
              <p>Tens: {tens}</p>
              <button onClick={() => setTens(0)} disabled={showTryAgain}>
                Reset Tens
              </button>
            </div>

            <div className="ks2-column">
              <p>Ones: {ones}</p>
              <button onClick={() => setOnes(0)} disabled={showTryAgain}>
                Reset Ones
              </button>
            </div>
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
          <h3>Need help? (check the hints)</h3>

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
            disabled={showTryAgain}
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

export default KS2Easy;