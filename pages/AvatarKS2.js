import React, { useEffect, useState } from "react"; // usestate helps changing data, UseEffect runs the code when page loads
import { useNavigate } from "react-router-dom"; // helps navigate users around pages 
import "./Index.css"; // links CSS 

function AvatarKS2() {  // this function navigate for page redirection

  const navigate = useNavigate();  // navigate around pages
  const [student, setStudent] = useState(null);   // stores student login details and (null) because student data does not exist when the page first loads.
  const [selectedAvatar, setSelectedAvatar] = useState("");  // store avatar that chosen by students
  const [showPopup, setShowPopup] = useState(false);   // popup hidden when page loads first 

  // list of avatar images
  const avatars = [
    "img1.png",
    "img2.png",
    "img3.png",
    "img4.png",
    "img5.png",
    "img6.png",
    "img7.png",
    "img8.png",
    "img9.png",
  ];

  // this runs when the page first loads
  useEffect(() => {

    const studentData = localStorage.getItem("student"); // get student info from saved localstorage (backend)

    // if not found return to studentlogin
    if (!studentData) {
      navigate("/studentlogin");
      return;
    }

    // this converts the student data from JSON into javascript 
    try {
      const parsedStudent = JSON.parse(studentData);
      setStudent(parsedStudent); // save the student data so page can use it
    } catch (error) {
      console.error("Failed to read student from localStorage:", error); // shows error if student data cannot be read properly.
      navigate("/studentlogin"); // send back to student login
    }
  }, [navigate]);

  // handles avatar when the student click an avatar.
  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar.trim()); // saves the selected avatar
    setShowPopup(true); // show pop up for confirmation
  };

  const handleYes = async () => {

    // this checks if student information or avatar is missing 
    if (!student || !selectedAvatar) {
      alert("Student or avatar is missing.");
      return;
    }

    // finds the student id from student object
    const studentId =
      student.student_id ||
      student.studentId ||
      student.id ||
      "";

    // show message if student id cannot be found
    if (!studentId) {
      console.log("Student object:", student);
      alert("Student ID is missing.");
      return;
    }

    try {

      // sends the selected avatar to the backend server to save it
      const response = await fetch(
        "http://localhost/learniverse_backend/update_avatar.php",
        {
          method: "POST",  // POST method is used to send data to backend server
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            student_id: studentId,
            avatar: selectedAvatar,
          }),
        }
      );

      // server response then convert into javascript 
      const data = await response.json();

      // if avatar is updated successful
      if (data.status === "success") {

        const updatedStudent = {  // create update on student information
          ...student,
          student_id: studentId,
          avatar: selectedAvatar,
        };

        // stores updated information in the localstorage
        localStorage.setItem("student", JSON.stringify(updatedStudent));

        setStudent(updatedStudent); // updates student information on the page
        setShowPopup(false); // hides popup 
        navigate("/homeKS2");

      } else {
        alert(data.message || "Failed to update avatar."); // shows an error if avatar cannot be updated.
      }

    } catch (error) {
      console.error("Avatar update error:", error); // shows an error if server connection fails
      alert("Could not save avatar."); // error message shown to the user
    }
  };

  // this runs when user clicks No 
  const handleNo = () => {
    setShowPopup(false);
  };

  // if student not found stop until the information is ready
  if (!student) return null;

  return (
    <div className="pagebackground">

      {/* Title header */}
      <div className="avatarDark-bg">

        <img
          src="/imgs/navigators/arrow_left.png"
          className="KS1-back-arrow"
          alt="Back"
          onClick={() => navigate("/homeKS2")}
        />

        <h1 className="avatar-header">Choose Your Avatar</h1>
      </div>

      {/* main body */}
      <div className="avatar-title">
        <h2>Select Your Favourite Avatar</h2>
      </div>

      {/* displays all avatars */}
      <div className="avatarGrid">

        {/* loops through avatar list and displays each avatar */}
        {avatars.map((avatar) => (
          <div
            key={avatar}

            // shows selected style if avatar already chosen
            className={`avatarCircle ${student.avatar === avatar ? "selected" : ""}`}

            
            onClick={() => handleAvatarClick(avatar)}
          >
            <img
              src={`/imgs/avatars_KS2/${avatar}`}
              alt={avatar}
              className="avatar"
            />
          </div>
        ))}
      </div>

      {/* popup appears after selecting avatar */}
      {showPopup && (
        <div className="popupOverlay">
          <div className="popupBox">

            <p>Are you sure you want to change your avatar?</p>

            <button className="confirmYes-btn" onClick={handleYes}>
              Yes
            </button>

            <button className="confirmNo-btn" onClick={handleNo}>
              No
            </button>
          </div>
        </div>
      )}

      {/* back button */}
      <button className="Confirmback-btn" onClick={() => navigate("/homeKS2")}>
        Back
      </button>
    </div>
  );
}

export default AvatarKS2;