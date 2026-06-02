import React, { useState, useEffect, useRef, useCallback } from "react"; // usestate stores changing data, useEffect runs code when page loads, useRef stores values without re-rendering, useCallback prevents function recreation
import { useNavigate } from "react-router-dom"; // helps navigate users around pages
import "./Index.css"; // links CSS

const TIME_LIMIT = 50; // sets timer limit to 50 seconds

function KS1Easy() { // this function creates the KS1 Easy counting game

  const navigate = useNavigate(); // navigate around pages

  const [questions, setQuestions] = useState([]); // stores all game questions
  const [index, setIndex] = useState(0); // stores current question number
  const [basketItems, setBasketItems] = useState([]); // stores items dropped into basket
  const [objects, setObjects] = useState([]); // stores draggable game objects
  const [showTryAgain, setShowTryAgain] = useState(false); // try again button hidden when page loads

  const [loading, setLoading] = useState(true); // loading screen shown while fetching questions
  const [fetchError, setFetchError] = useState(null); // stores fetch errors

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT); // stores timer countdown
  const [score, setScore] = useState(0); // stores player score
  const [lives, setLives] = useState(3); // stores player lives

  const timerSoundRef = useRef(null); // stores timer sound 
  const timerRef = useRef(null); // stores timer interval 
  const scoreRef = useRef(0); // stores latest score value

  // object image list
  const imagesForObj = {
    apple: "/imgs/games/apple.png",
    honeypot: "/imgs/games/honeypot.png",
    panda: "/imgs/avatars_KS1/Panda.png",
    fly: "/imgs/avatars_KS1/Fly.png",
    bug: "/imgs/avatars_KS1/Bug.png",
    balloon: "/imgs/games/balloon.png",
    star: "/imgs/games/star.png",
    strawberry: "/imgs/games/strawberry.png",
    peelbanana: "/imgs/games/peelBanana.png",
    lion: "/imgs/games/lion.png",
    bee: "/imgs/avatars_KS1/Bee.png",
    banana: "/imgs/games/banana.png",
    snake: "/imgs/games/snake.png",
    candy: "/imgs/games/candy.png",
    monkey: "/imgs/avatars_KS1/Monkey.png",
    berry: "/imgs/games/berry.png",
    carrot: "/imgs/games/carrot.png",
  };

  // cleans and formats object names
  const normaliseType = (type) => {
    if (!type) return "apple";

    let cleanType = type.toString().toLowerCase().trim();
    cleanType = cleanType.replace(".png", "");
    cleanType = cleanType.replace(/_/g, "");
    cleanType = cleanType.replace(/\s+/g, "");

    // removes s from plural words
    if (cleanType.endsWith("s")) {
      cleanType = cleanType.slice(0, -1);
    }

    return cleanType;
  };

  // gets correct image for object type
  const getImage = (type) => {
    const cleanType = normaliseType(type);
    return imagesForObj[cleanType] || "/imgs/games/apple.png";
  };

  // gets target number from question
  const getTargetFromQuestion = (question) => {
    if (!question) return 1;

    if (question.target_value != null && Number(question.target_value) > 0) {
      return Number(question.target_value);
    }

    const match = question.instruction_template?.match(/\d+/);
    return match ? Number(match[0]) : 1;
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
      "http://localhost/learniverse_backend/get_questions.php?key_stage=KS1&level=easy"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })

      // randomises questions and selects 5 questions from database
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error(data.message || "Invalid question data");
        }

        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);

        setQuestions(selected);
        setIndex(0);
        setScore(0);
        scoreRef.current = 0;
        setLives(3);
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

  // generates draggable objects for each question
  useEffect(() => {
    if (!question) return;

    const target = getTargetFromQuestion(question);
    const objName = normaliseType(question.object_name || "apple");
    const amount = target + Math.floor(Math.random() * 3) + 3;

    const generated = Array.from({ length: amount }, (_, i) => ({
      id: i,
      type: objName,
    }));

    setObjects(generated);
    setBasketItems([]);
    setShowTryAgain(false);
    setTimeLeft(TIME_LIMIT);
  }, [question]);

  // saves final score attempt into database
  const saveFinalAttempt = useCallback(
    async (finalScore) => {
      try {
        const student = JSON.parse(localStorage.getItem("student"));

        const student_id =
          student?.studentId ??
          student?.student_id ??
          localStorage.getItem("student_id");

        // stops saving if no student id found
        if (!student_id) {
          console.warn("No student_id found. KS1 Easy score not saved.");
          return;
        }

        await fetch("http://localhost/learniverse_backend/Save_attempts.php", {
          method: "POST", // sends score data to backend
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id,
            level: "easy",
            score: finalScore,
            total_questions: questions.length,
            status: "completed",
          }),
        });
      } catch (error) {
        console.error("Save KS1 Easy final attempt error:", error);
      }
    },
    [questions.length]
  );

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

  // restarts the game level
  const restartLevel = useCallback(() => {
    stopTimer();
    fetchQuestions();
    setLives(3);
    setTimeLeft(TIME_LIMIT);
    setBasketItems([]);
    setObjects([]);
    setShowTryAgain(false);
  }, [fetchQuestions, stopTimer]);

  // moves to next question or score page
  const nextQuestion = useCallback(
    async (finalScore = scoreRef.current) => {
      stopTimer();

      if (index + 1 < questions.length) {
        setIndex((prev) => prev + 1);
      } else {

        // saves final score and moves to score page
        await saveFinalAttempt(finalScore);

        navigate("/ScoreKS1", {
          state: {
            score: finalScore,
            total: questions.length,
            level: "easy",
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

  // handles drag and drop into basket
  const dropIntoBasket = (e) => {
    e.preventDefault();

    if (showTryAgain) return;

    const id = Number(e.dataTransfer.getData("id"));
    const dragged = objects.find((o) => o.id === id);

    if (!dragged) return;

    // removes dragged object from object area
    setObjects((prev) => prev.filter((o) => o.id !== id));

    // adds object into basket
    setBasketItems((prev) => [...prev, dragged]);
  };

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

  // checks if answer is correct
  const checkAnswer = useCallback(() => {
    if (!question || showTryAgain) return;

    const target = getTargetFromQuestion(question);

    // checks if basket item count matches target
    const correct = basketItems.length === target;

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
  }, [basketItems.length, question, nextQuestion, loseLife, showTryAgain]);

  //  retry question
  const tryAgain = () => {
    
    setShowTryAgain(false);
  };

  // loading screen
  if (loading) return <div>Loading questions...</div>;

  // fetch error screen
  if (fetchError) return <div>Error: {fetchError}</div>;

  // no question found screen
  if (!question) return <div>No KS1 easy questions found.</div>;

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
            <h1>Counting Quest</h1>
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

        {/* draggable objects area */}
        <div className="objectArea">

          {/* displays all game objects */}
          {objects.map((obj) => (
            <img
              key={obj.id}
              src={getImage(obj.type)}
              draggable={!showTryAgain}
              onDragStart={(e) => e.dataTransfer.setData("id", obj.id)}
              className="gameObject"
              alt={obj.type}
            />
          ))}
        </div>

        {/* basket drop area */}
        <div
          className="basket"
          onDragOver={(e) => e.preventDefault()}
          onDrop={dropIntoBasket}
        >
          <img
            src="/imgs/games/Basket.png"
            alt="basket"
            className="BasketImg"
          />

          {/* objects inside basket */}
          <div className="basket-items">
            {basketItems.map((item, i) => (
              <img
                key={i}
                src={getImage(item.type)}
                className="basket-object"
                alt={item.type}
              />
            ))}
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

          <button className="KS1-back-btn" onClick={() => navigate("/homeKS1")}>
            <p>Back</p>
          </button>

          <button
            className="KS1-next-btn"
            onClick={checkAnswer}
            disabled={showTryAgain}
          >
            <p>Next</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default KS1Easy;