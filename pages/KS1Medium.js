import React, { useState, useEffect, useRef, useCallback } from "react"; // usestate stores changing data, useEffect runs code when page loads, useRef stores values without re-rendering, useCallback prevents function recreation
import { useNavigate } from "react-router-dom"; // helps navigate users around pages
import "./Index.css"; // links CSS

const TIME_LIMIT = 30; // sets timer limit to 30 seconds

function KS1Medium({ level = "medium" }) { // this function creates the KS1 Medium game

  const navigate = useNavigate(); // navigate around pages

  const [questions, setQuestions] = useState([]); // stores all game questions
  const [index, setIndex] = useState(0); // stores current question number

  const [basketA, setBasketA] = useState([]); // stores objects for basket A
  const [basketB, setBasketB] = useState([]); // stores objects for basket B
  const [selectedBaskets, setSelectedBaskets] = useState([]); // stores selected basket answers
  const [showTryAgain, setShowTryAgain] = useState(false); // try again button hidden when page loads

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT); // stores timer countdown
  const [score, setScore] = useState(0); // stores player score
  const [lives, setLives] = useState(3); // stores player lives

  const [loading, setLoading] = useState(true); // loading screen shown while fetching questions
  const [fetchError, setFetchError] = useState(null); // stores fetch errors

  const timerSoundRef = useRef(null); // stores timer sound
  const timerRef = useRef(null); // stores timer interval
  const scoreRef = useRef(0); // stores latest score value

  // object image list
  const imagesForObj = {
    apple: "/imgs/games/apple.png",
    banana: "/imgs/games/banana.png",
    peelbanana: "/imgs/games/peelBanana.png",
    panda: "/imgs/avatars_KS1/Panda.png",
    fly: "/imgs/avatars_KS1/Fly.png",
    bug: "/imgs/avatars_KS1/Bug.png",
    bee: "/imgs/avatars_KS1/Bee.png",
    balloon: "/imgs/games/balloon.png",
    star: "/imgs/games/star.png",
    lion: "/imgs/games/lion.png",
    candy: "/imgs/games/candy.png",
    monkey: "/imgs/avatars_KS1/Monkey.png",
    snake: "/imgs/games/snake.png",
    berry: "/imgs/games/berry.png",
    carrot: "/imgs/games/carrot.png",
    giraffe: "/imgs/games/giraffe.png",
    mouse: "/imgs/games/mouse.png",
    bear: "/imgs/games/bear.png",
    chocolate: "/imgs/games/chocolate.png",
    watermelon: "/imgs/games/watermelon.png",
    butterfly: "/imgs/games/butterfly.png",
    cat: "/imgs/games/cat.png",
    ball: "/imgs/games/ball.png",
  };

  // gets correct image for object type
  const getImage = (type) => {
    if (!type) return "/imgs/games/apple.png";

    let cleanType = type.toString().toLowerCase().trim();
    cleanType = cleanType.replace(".png", "");
    cleanType = cleanType.replace(/_/g, "");
    cleanType = cleanType.replace(/\s+/g, "");

    // removes s from plural words
    if (cleanType.endsWith("s")) {
      cleanType = cleanType.slice(0, -1);
    }

    return imagesForObj[cleanType] || "/imgs/games/apple.png";
  };

  // keeps latest score updated
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // fetches questions from backend
  const fetchQuestions = useCallback(() => {
    setLoading(true);
    setFetchError(null);

    fetch(
      "http://localhost/learniverse_backend/get_questions.php?key_stage=KS1&level=medium"
    )
      .then((res) => {

        // shows error if network fails
        if (!res.ok) throw new Error("Network error");

        return res.json();
      })

      // filters and randomises medium questions
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error(data.message || "Invalid question data");
        }

        const filtered = data.filter((q) => {
          const type = (q.type || "").toLowerCase().trim();

          // only allows comparison questions
          return (
            type === "comparison_more" ||
            type === "comparison_less" ||
            type === "comparison_equal"
          );
        });

        // randomises question order
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());

        const selected = shuffled.slice(0, 5); // selects only 5 questions

        setQuestions(selected);
        setIndex(0);
        setScore(0);
        scoreRef.current = 0;
        setLives(3);
        setSelectedBaskets([]);
        setShowTryAgain(false);
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

  // creates basket objects for each question
  useEffect(() => {
    if (!question) return;

    const objType = question.object_name || "apple";

    const startValue =
      question.start_value !== null && question.start_value !== undefined
        ? Number(question.start_value)
        : Number(question.value1) || 0;

    const targetValue =
      question.target_value !== null && question.target_value !== undefined
        ? Number(question.target_value)
        : Number(question.value2) || 0;

    // creates objects for basket A
    const leftItems = Array.from({ length: startValue }, (_, i) => ({
      id: `A-${index}-${i}`,
      type: objType,
    }));

    // creates objects for basket B
    const rightItems = Array.from({ length: targetValue }, (_, i) => ({
      id: `B-${index}-${i}`,
      type: objType,
    }));

    setBasketA(leftItems);
    setBasketB(rightItems);
    setSelectedBaskets([]);
    setShowTryAgain(false);
    setTimeLeft(TIME_LIMIT);

  }, [question, index]);

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
          console.warn("No student_id found. KS1 Medium score not saved.");
          return;
        }

        await fetch("http://localhost/learniverse_backend/Save_attempts.php", {
          method: "POST", // sends score data to backend
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            student_id,
            level: "medium",
            score: finalScore,
            total_questions: questions.length,
            status: "completed",
          }),
        });

      } catch (error) {

        // shows save errors
        console.error("Save KS1 Medium final attempt error:", error);
      }
    },
    [questions.length]
  );

  // moves to next question or score page
  const nextQuestion = useCallback(
    async (finalScore = scoreRef.current) => {

      stopTimer();

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
            level,
          },
        });
      }
    },
    [index, questions.length, navigate, stopTimer, saveFinalAttempt, level]
  );

  // restarts the game level
  const restartLevel = useCallback(() => {

    stopTimer();

    setIndex(0);
    setScore(0);
    scoreRef.current = 0;
    setLives(3);
    setSelectedBaskets([]);
    setShowTryAgain(false);
    setTimeLeft(TIME_LIMIT);

    fetchQuestions();

  }, [fetchQuestions, stopTimer]);

  // removes a life when answer is wrong
  const loseLife = useCallback(() => {

    setLives((prev) => {

      const newLives = prev - 1;

      // restart game if no lives left
      if (newLives <= 0) {
        alert("Game Over!");
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

    // creates timer sound
    timerSoundRef.current = new Audio("/mp3/timer.mp3");

    timerRef.current = setInterval(() => {

      setTimeLeft((prev) => {

        // plays warning sound at 13 seconds
        if (prev === 13) {
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

  // handles basket selection
  const handleBasketClick = useCallback(
    (basket) => {

      if (showTryAgain) return;

      const type = (question?.type || "").toLowerCase();

      // allows selecting both baskets for equal comparison questions
      if (type === "comparison_equal") {

        setSelectedBaskets((prev) =>
          prev.includes(basket)
            ? prev.filter((b) => b !== basket)
            : [...prev, basket]
        );

      } else {

        // allows only one basket selection
        setSelectedBaskets([basket]);
      }
    },
    [question, showTryAgain]
  );

  // checks if answer is correct
  const checkAnswer = () => {

    if (!question || selectedBaskets.length === 0 || showTryAgain) return;

    const aCount = basketA.length;
    const bCount = basketB.length;
    const type = (question.type || "").toLowerCase();

    let correct = false;

    // checks more comparison
    if (type === "comparison_more") {
      if (aCount > bCount && selectedBaskets.includes("A")) correct = true;
      if (bCount > aCount && selectedBaskets.includes("B")) correct = true;
    }

    // checks less comparison
    if (type === "comparison_less") {
      if (aCount < bCount && selectedBaskets.includes("A")) correct = true;
      if (bCount < aCount && selectedBaskets.includes("B")) correct = true;
    }

    // checks equal comparison
    if (type === "comparison_equal") {
      if (
        aCount === bCount &&
        selectedBaskets.includes("A") &&
        selectedBaskets.includes("B")
      ) {
        correct = true;
      }
    }

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

  // clears basket selection and retries question
  const tryAgain = () => {
    setSelectedBaskets([]);
    setShowTryAgain(false);
  };

  // loading screen
  if (loading) return <div>Loading questions...</div>;

  // fetch error screen
  if (fetchError) return <div>Error: {fetchError}</div>;

  // no question found screen
  if (!question) return <div>No medium level comparison questions found.</div>;

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
            <h1>Basket Challenge</h1>
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
          Question: {question.instruction_template}
        </h2>

        {/* basket comparison area */}
        <div className="comparison-container">

          {/* basket A */}
          <div
            className={`basket-box clickable-basket ${
              selectedBaskets.includes("A") ? "selected-basket" : ""
            }`}
            onClick={() => handleBasketClick("A")}
          >

            <img
              src="/imgs/games/Basket.png"
              className="BasketImg"
              alt="basket"
            />

            {/* objects inside basket A */}
            <div className="basket-items">
              {basketA.map((item) => (
                <img
                  key={item.id}
                  src={getImage(item.type)}
                  className="basket-object"
                  alt={item.type}
                />
              ))}
            </div>
          </div>

          {/* basket B */}
          <div
            className={`basket-box clickable-basket ${
              selectedBaskets.includes("B") ? "selected-basket" : ""
            }`}
            onClick={() => handleBasketClick("B")}
          >

            <img
              src="/imgs/games/Basket.png"
              className="BasketImg"
              alt="basket"
            />

            {/* objects inside basket B */}
            <div className="basket-items">
              {basketB.map((item) => (
                <img
                  key={item.id}
                  src={getImage(item.type)}
                  className="basket-object"
                  alt={item.type}
                />
              ))}
            </div>
          </div>
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
            disabled={selectedBaskets.length === 0 || showTryAgain}
          >
            <p>Next</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default KS1Medium;