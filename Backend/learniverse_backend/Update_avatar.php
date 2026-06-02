<?php

// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// tells browser the response will be JSON
header("Content-Type: application/json");

// handles browser permission check request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// connects to database
include "db.php";

// gets JSON data sent from frontend
$data = json_decode(file_get_contents("php://input"), true);

// gets student id and avatar from request
$student_id = trim($data['student_id'] ?? '');
$avatar = trim($data['avatar'] ?? '');

// checks if student id or avatar is missing
if (!$student_id || !$avatar) {
    echo json_encode([
        "status" => "error",
        "message" => "Student ID and avatar are required"
    ]);
    exit;
}

// checks if student exists in database
$checkSql = "SELECT student_id FROM students WHERE student_id = ?";

// SQL query
$checkStmt = $conn->prepare($checkSql);

// adds student id into query
$checkStmt->bind_param("s", $student_id);

// runs the query
$checkStmt->execute();

// gets result
$checkResult = $checkStmt->get_result();

// if student does not exist
if ($checkResult->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Student not found"
    ]);

    $checkStmt->close();
    $conn->close();
    exit;
}

$checkStmt->close();

// SQL query to update avatar
$sql = "UPDATE students SET avatar = ? WHERE student_id = ?";

// prepares update query
$stmt = $conn->prepare($sql);

// adds avatar and student id into SQL
$stmt->bind_param("ss", $avatar, $student_id);

// runs update query
if ($stmt->execute()) {

    // success response
    echo json_encode([
        "status" => "success"
    ]);

} else {

    // error response if update fails
    echo json_encode([
        "status" => "error",
        "message" => $stmt->error
    ]);
}

// closes statement and database connection
$stmt->close();
$conn->close();

?>