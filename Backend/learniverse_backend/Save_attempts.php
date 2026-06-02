<?php

// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// tells browser the response will be JSON
header("Content-Type: application/json; charset=UTF-8");

// handles browser permission check request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    echo json_encode(["success" => true]);
    exit;
}

// connects to database
include "db.php";

// checks if database connection failed
if (!isset($conn) || !$conn) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

// sets database character format
mysqli_set_charset($conn, "utf8mb4");

// gets JSON data sent from frontend
$data = json_decode(file_get_contents("php://input"), true);

// checks if JSON is invalid
if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON received"
    ]);
    exit;
}

// gets attempt details from frontend
$student_id = trim($data["student_id"] ?? "");
$level = strtolower(trim($data["level"] ?? ""));
$score = intval($data["score"] ?? 0);
$total_questions = intval($data["total_questions"] ?? 5);
$status = strtolower(trim($data["status"] ?? "completed"));

// gets set number and current question
$set_number = intval($data["set_number"] ?? 1);
$current_question = intval($data["current_question"] ?? $total_questions);

// checks if student id or level is missing
if ($student_id === "" || $level === "") {
    echo json_encode([
        "success" => false,
        "message" => "Missing student_id or level"
    ]);
    exit;
}

// only allows these levels
if (!in_array($level, ["easy", "medium", "hard"])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid level"
    ]);
    exit;
}

// if total questions is wrong, set it back to 5
if ($total_questions <= 0) {
    $total_questions = 5;
}

// makes sure score cannot be below 0 or above total questions
if ($score < 0) $score = 0;
if ($score > $total_questions) $score = $total_questions;

// works out the percentage score (round to 2 demicals)
$percentage = round(($score / $total_questions) * 100, 2);

// prepares insert query to save attempt
$stmt = $conn->prepare("
    INSERT INTO attempts
    (student_id, level, set_number, current_question, score, total_questions, percentage, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

// checks if prepare failed
if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . $conn->error
    ]);
    exit;
}

// safely adds values into SQL
$stmt->bind_param(
    "ssiiiids",
    $student_id,
    $level,
    $set_number,
    $current_question,
    $score,
    $total_questions,
    $percentage,
    $status
);

// runs insert query
if ($stmt->execute()) {

    // success response
    echo json_encode([
        "success" => true,
        "message" => "KS1 attempt saved successfully"
    ]);

} else {

    // error response if saving failed
    echo json_encode([
        "success" => false,
        "message" => "Execute failed: " . $stmt->error
    ]);
}

// closes statement and database connection
$stmt->close();
$conn->close();
exit;

?>