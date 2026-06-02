import React, { useEffect, useState } from "react"; // usestate helps changing data, UseEffect runs the code when page loads
import { useNavigate } from "react-router-dom"; // helps navigate users around pages 
import "./Index.css"; // links CSS 

function AvatarKS1() {  // this function navigate for page redirection
  const navigate = useNavigate();  // navigate around pages
  const [student, setStudent] = useState(null);   // stores student login details and (null) because student data does not exist when the page first loads.
  const [selectedAvatar, setSelectedAvatar] = useState("");  // store savatar that chosen by students
  const [showPopup, setShowPopup] = useState(false);   // popup hidden when page loads first 


  // list of avtars images
  const avatars = [
    "Bee.png",
    "Mice.png",
    "Bug.png",
    "Cat.png",
    "catterpillar.png",
    "Elephant.png",
    "fly.png",
    "Monkey.png",
    "Lion.png",
  ];

  //this runs when the page first loads

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

    // thios checks if student informatipon or avatar is missing 
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
      const response = await fetch( // sends the selected avatr to the backend server to save it
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

      //server response then convert into javascript format

      const data = await response.json();

      // if avatar is updated successful
      if (data.status === "success") {
        const updatedStudent = {  // create update on student information
          ...student,
          student_id: studentId,
          avatar: selectedAvatar,
        };

        //stores updated information in the localstorage
        localStorage.setItem("student", JSON.stringify(updatedStudent));
        setStudent(updatedStudent); // updates student information on the page
        setShowPopup(false); // hides popup 
        navigate("/homeKS1"); 
      } else {
        alert(data.message || "Failed to update avatar.");  // shows an error if avtar cannot be updated.
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
      {/* Title  header*/}
      <div className="avatarDark-bg">
        <img
          src="/imgs/navigators/arrow_left.png"
          className="KS1-back-arrow"
          alt="Back"
          onClick={() => navigate("/homeKS1")}
        />

        
        <h1 className="avatar-header">Choose Your Avatar</h1>
      </div>
 
        {/* main body */}
      <div className="avatar-title">
        <h2>Select Your Favourite Avatar</h2>
      </div>

      <div className="avatarGrid">
        {avatars.map((avatar) => (
          <div
            key={avatar}
            className={`avatarCircle ${student.avatar === avatar ? "selected" : ""}`}
            onClick={() => handleAvatarClick(avatar)}
          >
            <img
              src={`/imgs/avatars_KS1/${avatar}`}
              alt={avatar}
              className="avatar"
            />
          </div>
        ))}
      </div>

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

      <button className="Confirmback-btn" onClick={() => navigate("/homeKS1")}>
        Back
      </button>
    </div>
  );
}

export default AvatarKS1;