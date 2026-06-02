<?php
// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// allow browser permission to reach the backend therefore backend and frontend don't crash
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// database connection
$conn = new mysqli("localhost", "root", "", "learniverse");

// checks if database connection failed
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// gets JSON data sent from frontend
$data = json_decode(file_get_contents("php://input"), true);

// gets student id and avatar from frontend
$student_id = $data['student_id'];
$avatar = $data['avatar'];

// updates the student's avatar in the database
$sql = "UPDATE students SET avatar='$avatar' WHERE student_id='$student_id'";

// checks if update worked
if ($conn->query($sql) === TRUE) {

    // success response
    echo json_encode(["status" => "success"]);

} else {

    // error response if update fails
    echo json_encode([
        "status" => "error",
        "message" => $conn->error
    ]);
}

// closes database connection
$conn->close();

?>